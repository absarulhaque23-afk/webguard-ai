"""
Complete ML Training Pipeline
Trains and compares Logistic Regression, Random Forest, and XGBoost.
Selects best model by weighted F1 score.
"""
import pandas as pd
import numpy as np
import os
import json
import joblib
from datetime import datetime
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score,
    f1_score, roc_auc_score, confusion_matrix, classification_report
)

import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from features.feature_names import FEATURE_NAMES


CLASS_LABELS = ['BENIGN', 'SUSPICIOUS', 'MALICIOUS']


def run_pipeline():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(base_dir, 'datasets', 'phishing_dataset.csv')

    if not os.path.exists(data_path):
        print("ERROR: Dataset not found. Run: python -m training.generate_dataset")
        return

    # ── Load & Clean ──
    print("=" * 60)
    print("WebGuard AI — ML Training Pipeline")
    print("=" * 60)

    df = pd.read_csv(data_path)
    print(f"\nLoaded dataset: {df.shape[0]} rows, {df.shape[1]} columns")

    initial_count = len(df)
    df.drop_duplicates(inplace=True)
    df.dropna(inplace=True)
    print(f"After cleaning: {len(df)} rows (removed {initial_count - len(df)} duplicates/nulls)")

    print(f"\nClass distribution:")
    for label_val, label_name in enumerate(CLASS_LABELS):
        count = (df['label'] == label_val).sum()
        pct = count / len(df) * 100
        print(f"  {label_name} ({label_val}): {count} ({pct:.1f}%)")

    # ── Feature / Label Split ──
    X = df[FEATURE_NAMES].values
    y = df['label'].values

    # ── Train / Val / Test Split (70/15/15) ──
    X_train_val, X_test, y_train_val, y_test = train_test_split(
        X, y, test_size=0.15, stratify=y, random_state=42
    )
    X_train, X_val, y_train, y_val = train_test_split(
        X_train_val, y_train_val, test_size=0.1765, stratify=y_train_val, random_state=42
    )
    print(f"\nSplit: Train={len(X_train)}, Val={len(X_val)}, Test={len(X_test)}")

    # ── Scale Features ──
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_val_scaled = scaler.transform(X_val)
    X_test_scaled = scaler.transform(X_test)

    # ── Define Models ──
    models = {
        'LogisticRegression': {
            'model': LogisticRegression(random_state=42, max_iter=1000),
            'params': {
                'C': [0.01, 0.1, 1, 10],
                'solver': ['lbfgs']
            }
        },
        'RandomForest': {
            'model': RandomForestClassifier(random_state=42),
            'params': {
                'n_estimators': [100, 200],
                'max_depth': [10, 20, None],
                'min_samples_split': [2, 5]
            }
        },
        'XGBoost': {
            'model': XGBClassifier(
                random_state=42,
                eval_metric='mlogloss',
                verbosity=0
            ),
            'params': {
                'n_estimators': [100, 200],
                'max_depth': [3, 6],
                'learning_rate': [0.01, 0.1]
            }
        }
    }

    # ── Train & Evaluate ──
    results = {}
    best_f1 = -1
    best_model_name = ""
    best_model = None

    print(f"\n{'=' * 60}")
    print("Model Training & Evaluation")
    print('=' * 60)

    for name, m in models.items():
        print(f"\n>> Training {name}...")
        grid = GridSearchCV(
            m['model'], m['params'],
            cv=5, scoring='f1_weighted',
            n_jobs=-1, verbose=0
        )
        grid.fit(X_train_scaled, y_train)

        # Evaluate on test set
        y_pred = grid.predict(X_test_scaled)
        y_prob = grid.predict_proba(X_test_scaled)

        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, average='weighted', zero_division=0)
        rec = recall_score(y_test, y_pred, average='weighted', zero_division=0)
        f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)

        try:
            auc = roc_auc_score(y_test, y_prob, multi_class='ovr', average='weighted')
        except ValueError:
            auc = 0.0

        cm = confusion_matrix(y_test, y_pred).tolist()

        results[name] = {
            'accuracy': round(acc, 4),
            'precision': round(prec, 4),
            'recall': round(rec, 4),
            'f1_score': round(f1, 4),
            'roc_auc': round(auc, 4),
            'best_params': {k: v if not isinstance(v, np.integer) else int(v)
                           for k, v in grid.best_params_.items()},
            'confusion_matrix': cm
        }

        print(f"  Accuracy:  {acc:.4f}")
        print(f"  Precision: {prec:.4f}")
        print(f"  Recall:    {rec:.4f}")
        print(f"  F1 Score:  {f1:.4f}")
        print(f"  ROC-AUC:   {auc:.4f}")
        print(f"  Best params: {grid.best_params_}")

        if f1 > best_f1:
            best_f1 = f1
            best_model_name = name
            best_model = grid.best_estimator_

    # ── Model Comparison Table ──
    print(f"\n{'=' * 60}")
    print("Model Comparison")
    print('=' * 60)
    print(f"{'Model':<25} {'Accuracy':<10} {'Precision':<10} {'Recall':<10} {'F1':<10} {'AUC':<10}")
    print('-' * 75)
    for name, r in results.items():
        marker = " *" if name == best_model_name else ""
        print(f"{name + marker:<25} {r['accuracy']:<10.4f} {r['precision']:<10.4f} "
              f"{r['recall']:<10.4f} {r['f1_score']:<10.4f} {r['roc_auc']:<10.4f}")

    print(f"\n[BEST] Best model: {best_model_name} (F1: {best_f1:.4f})")

    # ── Save Model Artifacts ──
    out_dir = os.path.join(base_dir, 'models', 'trained')
    os.makedirs(out_dir, exist_ok=True)

    # Save model
    model_path = os.path.join(out_dir, 'best_model.joblib')
    joblib.dump(best_model, model_path)
    print(f"\nSaved model to {model_path}")

    # Save scaler
    scaler_path = os.path.join(out_dir, 'scaler.joblib')
    joblib.dump(scaler, scaler_path)
    print(f"Saved scaler to {scaler_path}")

    # Save feature names
    features_path = os.path.join(out_dir, 'feature_names.json')
    with open(features_path, 'w') as f:
        json.dump(FEATURE_NAMES, f, indent=2)
    print(f"Saved feature names to {features_path}")

    # Save comprehensive metadata
    best_metrics = results[best_model_name]
    metadata = {
        'modelName': 'WebGuard AI URL Classifier',
        'version': '1.0.0',
        'algorithm': best_model_name,
        'accuracy': best_metrics['accuracy'],
        'precision': best_metrics['precision'],
        'recall': best_metrics['recall'],
        'f1Score': best_metrics['f1_score'],
        'rocAuc': best_metrics['roc_auc'],
        'confusionMatrix': best_metrics['confusion_matrix'],
        'classLabels': CLASS_LABELS,
        'trainingDataset': 'synthetic_phishing_10k',
        'datasetSize': len(df),
        'trainSize': len(X_train),
        'testSize': len(X_test),
        'features': FEATURE_NAMES,
        'featureCount': len(FEATURE_NAMES),
        'hyperparameters': best_metrics['best_params'],
        'trainedAt': datetime.now().isoformat(),
        'allModelResults': results
    }

    metadata_path = os.path.join(out_dir, 'model_metadata.json')
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=2)
    print(f"Saved metadata to {metadata_path}")

    # ── Print Confusion Matrix ──
    y_pred_best = best_model.predict(X_test_scaled)
    cm = confusion_matrix(y_test, y_pred_best)
    print(f"\nConfusion Matrix ({best_model_name}):")
    print(f"{'':>15} {'Pred BEN':>10} {'Pred SUS':>10} {'Pred MAL':>10}")
    for i, label in enumerate(CLASS_LABELS):
        print(f"{'Actual ' + label:>15} {cm[i][0]:>10} {cm[i][1]:>10} {cm[i][2]:>10}")

    # ── Classification Report ──
    print(f"\nClassification Report:")
    print(classification_report(y_test, y_pred_best, target_names=CLASS_LABELS))

    print("=" * 60)
    print("Training pipeline complete!")
    print("=" * 60)


if __name__ == "__main__":
    run_pipeline()
