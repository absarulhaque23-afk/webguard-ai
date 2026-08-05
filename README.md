# 🛡️ WebGuard AI — Malicious Webpage Detection Using AI/ML

<p align="center">
  <strong>AI-Powered Cybersecurity Platform for Detecting Malicious & Phishing URLs</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Express.js-4-green?style=flat-square&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/FastAPI-0.109-teal?style=flat-square&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/MongoDB-7-green?style=flat-square&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/XGBoost-2.0-blue?style=flat-square" alt="XGBoost" />
  <img src="https://img.shields.io/badge/Python-3.11+-blue?style=flat-square&logo=python" alt="Python" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript" alt="TypeScript" />
</p>

---

## 📖 Project Overview

WebGuard AI is a **production-style cybersecurity web application** that analyzes submitted URLs and predicts whether they are **BENIGN**, **SUSPICIOUS**, or **MALICIOUS** using machine learning. The system provides:

- 🔍 **Deep URL Analysis** — Extracts 25+ security-related features from URL structure
- 🤖 **ML-Powered Detection** — Compares Logistic Regression, Random Forest, and XGBoost models
- 📊 **Risk Scoring** — Generates a 0–100 risk score with confidence metrics
- 🔓 **Explainable AI** — Transparent predictions with feature importance explanations
- 🛡️ **Safe Analysis** — Controlled webpage analysis without executing untrusted JavaScript
- 📈 **Analytics Dashboard** — Track scan history and monitor threat trends

> ⚠️ **Disclaimer**: WebGuard AI provides AI-based predictions that are probabilistic in nature. ML predictions are **not** a guaranteed security verdict. The system can produce false positives and false negatives. Always exercise caution and use additional security measures.

---

## 🏗️ Architecture

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Next.js 14     │────▶│  Express.js API   │────▶│  FastAPI ML      │
│   Frontend       │◀────│  Backend          │◀────│  Service         │
│   (Port 3000)    │     │  (Port 5000)      │     │  (Port 8000)     │
└──────────────────┘     └────────┬───────────┘     └──────────────────┘
                                  │
                         ┌────────▼───────────┐
                         │     MongoDB        │
                         │   (Port 27017)     │
                         └────────────────────┘
```

### Request Flow

```
User submits URL
    ↓
Next.js Frontend → POST /api/scans
    ↓
Express Backend validates URL & checks SSRF
    ↓
Backend calls FastAPI ML Service → POST /predict
    ↓
ML Service extracts 25+ URL features
    ↓
XGBoost model generates prediction + confidence
    ↓
Feature importance & human-readable reasons generated
    ↓
Backend saves scan to MongoDB
    ↓
Frontend displays results with risk gauge & explanations
```

---

## ✨ Features

### Security & Detection
- ✅ 25+ URL feature extraction (length, entropy, subdomains, suspicious keywords, etc.)
- ✅ 3 ML model comparison (Logistic Regression, Random Forest, XGBoost)
- ✅ Risk score (0–100) with confidence metrics
- ✅ Risk levels: LOW (0–30), MEDIUM (31–60), HIGH (61–80), CRITICAL (81–100)
- ✅ Explainable AI with feature importance
- ✅ Safe webpage analysis (no JS execution)
- ✅ SSRF protection (blocks localhost, private IPs, metadata endpoints)

### Application
- ✅ JWT authentication with role-based access control (USER, ADMIN)
- ✅ URL scanner with multi-step progress animation
- ✅ Searchable/filterable scan history with pagination
- ✅ Analytics dashboard with Recharts visualizations
- ✅ Admin panel (user management, system analytics, model info)
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Dark cybersecurity theme with glassmorphism UI

### Security Controls
- ✅ Helmet security headers
- ✅ CORS configuration
- ✅ Rate limiting (100 req/15min general, 10 req/min for scans)
- ✅ Input validation & sanitization
- ✅ MongoDB query injection protection
- ✅ bcrypt password hashing
- ✅ Private IP / localhost blocking
- ✅ DNS rebinding considerations
- ✅ Request size limits
- ✅ Connection timeouts

---

## 🧠 ML Pipeline

### Dataset
- **Synthetic dataset** of ~10,000 URL samples generated programmatically
- **Class distribution**: 50% Benign, 25% Suspicious, 25% Malicious
- URLs mimic real-world patterns (phishing, legitimate, suspicious)
- **Limitation**: In production, replace with real datasets (PhishTank, UCI Phishing Dataset)

### Feature Engineering (25 Features)

| Category | Features |
|----------|----------|
| **Structure** | url_length, hostname_length, path_length, path_depth |
| **Character Analysis** | num_dots, num_hyphens, num_underscores, num_digits, num_special_chars |
| **Domain** | num_subdomains, domain_token_count, longest_subdomain_length |
| **Security Indicators** | has_ip_address, has_at_symbol, has_suspicious_keywords, is_shortened_url |
| **Protocol** | is_https, suspicious_tld |
| **Query/Fragment** | query_param_count, has_fragment, num_encoded_chars |
| **Statistical** | hostname_entropy, path_entropy, digit_ratio, special_char_ratio |

### Models Compared

| Model | Description |
|-------|-------------|
| **Logistic Regression** | Linear classifier with L2 regularization |
| **Random Forest** | Ensemble of decision trees |
| **XGBoost** | Gradient-boosted decision trees (typically best performer) |

### Evaluation Metrics
- Accuracy, Precision (weighted), Recall (weighted), F1 Score (weighted)
- ROC-AUC (One-vs-Rest)
- Confusion Matrix
- 5-Fold Cross-Validation

Best model selected by **weighted F1 Score** (not accuracy alone).

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| Recharts | Data visualization |
| React Hook Form + Zod | Form handling & validation |
| Axios | HTTP client |

### Backend
| Technology | Purpose |
|-----------|---------|
| Express.js | Web framework |
| TypeScript | Type safety |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Helmet | Security headers |
| express-rate-limit | Rate limiting |
| express-validator | Input validation |

### ML Service
| Technology | Purpose |
|-----------|---------|
| FastAPI | High-performance Python API |
| scikit-learn | ML algorithms |
| XGBoost | Gradient boosting |
| pandas/NumPy | Data processing |
| joblib | Model serialization |
| Pydantic | Data validation |

### Infrastructure
| Technology | Purpose |
|-----------|---------|
| MongoDB | Document database |
| Docker | Containerization |
| Docker Compose | Multi-service orchestration |

---

## 📦 Installation

### Prerequisites
- **Node.js** 18+
- **Python** 3.11+
- **MongoDB** 7+ (local or Docker)
- **pip** (Python package manager)
- **npm** (Node package manager)

### 1. Clone the Repository

```bash
cd webguard-ai
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and configure:
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — A strong random secret for JWT signing
- `ML_SERVICE_URL` — URL of the ML service (default: http://localhost:8000)
- `CORS_ORIGIN` — Frontend URL (default: http://localhost:3000)

### 3. Install & Setup ML Service

```bash
cd ml-service
pip install -r requirements.txt

# Generate synthetic dataset
python -m training.generate_dataset

# Train the ML model
python -m training.train_pipeline

# Start the ML service
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 4. Install & Setup Backend

```bash
cd backend
npm install

# Create backend .env
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start the backend (development mode)
npm run dev
```

### 5. Install & Setup Frontend

```bash
cd frontend
npm install

# Create frontend .env
cp .env.local.example .env.local

# Start the frontend
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **ML Service**: http://localhost:8000
- **ML Health Check**: http://localhost:8000/health

---

## 🐳 Docker Setup

Run the entire stack with Docker Compose:

```bash
# From the project root
docker-compose up --build
```

This starts:
- **MongoDB** on port 27017
- **ML Service** on port 8000
- **Backend** on port 5000
- **Frontend** on port 3000

To stop:

```bash
docker-compose down
```

To reset data:

```bash
docker-compose down -v
```

---

## 📡 API Documentation

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | No | Create a new account |
| `POST` | `/api/auth/login` | No | Login and get JWT token |
| `POST` | `/api/auth/logout` | Yes | Logout |
| `GET` | `/api/auth/me` | Yes | Get current user profile |

### Scans

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/scans` | Yes | Scan a URL |
| `GET` | `/api/scans` | Yes | Get scan history (paginated) |
| `GET` | `/api/scans/:id` | Yes | Get scan details |
| `DELETE` | `/api/scans/:id` | Yes | Delete a scan |

### Dashboard

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/dashboard/stats` | Yes | Get user statistics |

### Admin (ADMIN role only)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/admin/users` | Admin | List all users |
| `GET` | `/api/admin/scans` | Admin | List all scans |
| `GET` | `/api/admin/model` | Admin | Get ML model info |
| `GET` | `/api/admin/analytics` | Admin | System analytics |

### ML Service (Internal)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/predict` | Predict URL safety |
| `POST` | `/extract-features` | Extract features only |

### Example Prediction Response

```json
{
  "prediction": "MALICIOUS",
  "riskScore": 93,
  "confidence": 0.967,
  "riskLevel": "CRITICAL",
  "reasons": [
    "Suspicious URL structure detected",
    "IP address used instead of domain name",
    "Suspicious keywords detected in URL",
    "Multiple encoded characters detected"
  ],
  "features": {
    "url_length": 142,
    "has_ip_address": 1,
    "has_suspicious_keywords": 1,
    "num_encoded_chars": 5
  },
  "featureImportance": {
    "url_length": 0.15,
    "has_ip_address": 0.12,
    "hostname_entropy": 0.09
  },
  "modelVersion": "1.0.0",
  "disclaimer": "AI prediction — not a definitive security verdict."
}
```

---

## 🔒 Security Considerations

### URL Analysis Safety
- All submitted URLs are treated as **untrusted input**
- JavaScript from target pages is **never executed**
- SSRF protection blocks localhost, private IPs, metadata endpoints
- Strict timeouts (10s), response size limits (5MB), redirect limits (5)
- Only HTTP/HTTPS protocols allowed (file://, ftp://, etc. blocked)

### Application Security
- Passwords hashed with bcrypt (12 salt rounds)
- JWT tokens with configurable expiration
- Helmet security headers
- CORS whitelist configuration
- Rate limiting on all endpoints
- MongoDB injection protection via mongo-sanitize
- Request body size limits (1MB)
- Input validation on all endpoints

---

## 📁 Project Structure

```
webguard-ai/
├── frontend/                    # Next.js 14 Frontend
│   ├── app/                     # App Router pages
│   │   ├── admin/               # Admin panel pages
│   │   ├── dashboard/           # User dashboard
│   │   ├── scan/                # URL scanner
│   │   ├── history/             # Scan history
│   │   └── ...                  # Auth, about, etc.
│   ├── components/              # React components
│   │   ├── ui/                  # Reusable UI components
│   │   ├── layout/              # Navbar, Footer, Sidebar
│   │   ├── landing/             # Landing page sections
│   │   ├── scan/                # Scanner components
│   │   ├── dashboard/           # Dashboard charts
│   │   └── auth/                # Auth forms
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # API client, utilities
│   ├── services/                # API service functions
│   └── types/                   # TypeScript types
│
├── backend/                     # Express.js Backend
│   └── src/
│       ├── controllers/         # Route handlers
│       ├── routes/              # API routes
│       ├── models/              # Mongoose models
│       ├── services/            # Business logic
│       ├── middlewares/         # Auth, rate limit, etc.
│       ├── validators/          # Input validation
│       ├── utils/               # Helpers, SSRF protection
│       └── config/              # DB, CORS, env config
│
├── ml-service/                  # Python FastAPI ML Service
│   ├── app/                     # FastAPI application
│   │   ├── api/                 # API routes
│   │   ├── core/                # Config
│   │   └── schemas/             # Pydantic models
│   ├── features/                # Feature extraction
│   ├── training/                # ML pipeline
│   ├── models/trained/          # Serialized models
│   ├── datasets/                # Training data
│   └── tests/                   # Unit tests
│
├── docker-compose.yml           # Multi-service orchestration
├── .env.example                 # Environment template
└── README.md                    # This file
```

---

## 📸 Screenshots

> Screenshots will be added after running the application.

- Landing Page
- URL Scanner
- Scan Results with Risk Gauge
- Dashboard Analytics
- Scan History
- Admin Panel

---

## 🚀 Future Improvements

- [ ] Real phishing dataset integration (PhishTank, OpenPhish)
- [ ] SHAP-based deep explainability
- [ ] Browser extension for real-time URL checking
- [ ] Email/notification alerts for high-risk scans
- [ ] Batch URL scanning
- [ ] API key authentication for programmatic access
- [ ] Periodic model retraining pipeline
- [ ] VirusTotal/Google Safe Browsing API integration
- [ ] Threat intelligence feed integration
- [ ] Multi-language support

---

## ⚠️ Limitations

1. **Synthetic Dataset**: The current model is trained on synthetically generated URL data. In production, replace with real phishing datasets for improved accuracy.
2. **No Real-time Threat Intel**: The system does not integrate with live threat intelligence feeds.
3. **False Positives/Negatives**: ML models are probabilistic. Legitimate URLs may be flagged as suspicious, and some malicious URLs may pass undetected.
4. **URL-Only Analysis**: The primary analysis is based on URL structure. Webpage content analysis is optional and limited to safe HTTP fetching.
5. **No JavaScript Execution**: The system cannot detect threats that only manifest through JavaScript execution on the target page.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is created for educational and portfolio purposes. See LICENSE for details.

---

<p align="center">
  <strong>Built with ❤️ for Cybersecurity & AI/ML</strong>
</p>
