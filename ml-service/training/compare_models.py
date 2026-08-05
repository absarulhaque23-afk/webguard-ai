import pandas as pd

def compare_models(results_dict):
    df = pd.DataFrame(results_dict).T
    print("Model Comparison:")
    print(df.to_string())
    return df
