TrustGraph AI
 Explainable Multi-Agent Graph Intelligence Platform for Multi-Actor Fraud Detection & Remediation

 -->Overview

TrustGraph AI is an enterprise-inspired fraud intelligence platform that detects coordinated fraud across multiple actors rather than analyzing transactions in isolation.

Unlike traditional fraud detection systems that evaluate only a single transaction, TrustGraph AI correlates relationships between:

- Customers
- Sellers
- Delivery Partners
- Devices
- IP Addresses
- GST Numbers
- Addresses
- Transaction History

using Machine Learning, Graph Analytics, Explainable AI, and a Multi-Agent Decision Engine.

The platform enables investigators to discover fraud rings, understand why a transaction was flagged, visualize relationships through an interactive Trust Graph, and manage investigations and appeals from a single dashboard.

---

--> Problem Statement

Modern e-commerce platforms experience increasingly sophisticated fraud involving multiple entities working together.

Traditional fraud detection systems struggle to identify:

- Refund abuse
- Fake return scams
- Shared device fraud
- Shared IP fraud
- Fake seller networks
- Delivery partner collusion
- Organized fraud rings

because they analyze transactions individually rather than as connected relationships.

------------------------------------------------------------------------------------------------------------

--> Our Solution

TrustGraph AI builds a dynamic Trust Graph connecting every entity involved in a transaction.

The platform combines:

- Machine Learning
- Graph Intelligence
- Explainable AI
- Multi-Agent Orchestration

to generate:

- Fraud Risk Score
- Trust Score
- AI Explanation
- Community Detection
- Fraud Ring Detection
- Decision Recommendation
------------------------------------------------------------------------------------------------------------
--> Key Features

--> AI Fraud Detection

- Random Forest based fraud prediction
- Dynamic risk scoring
- Confidence estimation
- Feature engineering

---

--> Trust Graph

Interactive graph visualization connecting

- Customers
- Sellers
- Delivery Partners
- Devices
- IP Addresses
- GST Numbers
- Addresses

Supports

- Zoom
- Pan
- Search
- Node inspection
- Community highlighting

---

--> Explainable AI

Instead of displaying only

Risk = 92%

the platform explains

- Why the transaction was flagged
- Which evidence contributed
- Connected fraud cases
- Graph relationships
- Confidence level

---

--> Multi-Agent Architecture

The platform uses autonomous agents:

- Supervisor Agent
- Transaction Agent
- Fraud Detection Agent
- Feature Engineering Agent
- Graph Agent
- Evidence Agent
- Decision Agent
- Notification Agent
- Appeal Agent
- Audit Agent

---

--> Enterprise Dashboard

Real-time metrics

- Transactions
- Fraud Detected
- Money Protected
- Trust Score
- Pending Appeals
- Graph Communities
- System Health

---

--> Analytics

Visual analytics including

- Fraud Trends
- Trust Trends
- Community Growth
- Refund Analysis
- Risk Distribution
- Top Fraud Sellers
- Top Fraud Customers

---

-->  Investigation Workspace

Investigators can view

- Timeline
- Evidence
- Trust Score
- Graph Relationships
- AI Summary
- Decision History

---

-->  Reports

Export

- PDF
- CSV
- JSON

---

-->  Notification Center

Supports

- Email
- SMS (Mock)
- Dashboard Alerts
- Investigation Queue

---

--> Appeals Workflow

Allows

- Appeal Submission
- Evidence Upload
- Human Review
- Final Decision

---

-->  System Architecture

Customer Transaction
        │
        ▼
Transaction Agent
        │
        ▼
Feature Engineering
        │
        ▼
 ┌───────────────┬────────────────┐
 ▼               ▼
ML Engine     Trust Graph Engine
(RandomForest) (NetworkX)
 └───────────────┬────────────────┘
                 ▼
       Evidence Generation
                 ▼
         Explainable AI
                 ▼
        Decision Engine
                 ▼
   Notifications & Appeals
                 ▼
 Enterprise Dashboard

---

-->  Workflow
Transaction Created
        │
        ▼
Validate Transaction
        │
        ▼
Extract Features
        │
        ▼
Predict Fraud Risk
        │
        ▼
Build Trust Graph
        │
        ▼
Detect Communities
        │
        ▼
Generate Evidence
        │
        ▼
Generate AI Summary
        │
        ▼
Decision Engine
        │
        ▼
Notify Investigator
        │
        ▼
Appeal (Optional)
---

-->  Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Flow
- Recharts
- Framer Motion
- Lucide Icons

### Backend

- Python
- Flask
- SQLite
- SQLAlchemy (optional)
- NetworkX
- Scikit-learn

### Machine Learning

- Random Forest
- Feature Engineering
- Risk Scoring

### Graph Intelligence

- NetworkX
- Community Detection
- Connected Components
- Betweenness Centrality
- PageRank

---

-->  Project Structure

TrustGraphAI/

frontend/
    src/
        pages/
        components/
        hooks/
        services/
        assets/

backend/
    agents/
    graph/
    ml/
    database/
    routes/
    services/

docs/
screenshots/

README.md
requirements.txt
package.json

---

-->  Demo

Demo Video

https://your-demo-link

---

-->  Installation

## Backend

Bash

cd backend

python -m venv venv

pip install -r requirements.txt

python app.py

Backend runs on

http://localhost:5000

---

## Frontend

Bash

cd frontend

npm install

npm run dev

Runs on

http://localhost:5173

---

--> API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /dashboard | Dashboard statistics |
| GET | /transactions | Transaction list |
| GET | /graph | Trust Graph |
| POST | /analyze | Fraud analysis |
| GET | /analytics | Analytics |
| POST | /appeal | Submit appeal |
| GET | /alerts | Notification feed |

---

-->  Future Improvements

- Live Streaming Transactions
- Graph Neural Networks
- Deep Learning Models
- Real-time Kafka Pipeline
- Neo4j Graph Database
- Kubernetes Deployment
- Cloud Native Architecture
- AI Copilot
- Fraud Replay Engine
- Blockchain Audit Trail

---

-->  Real-World Applications

Suitable for

- Amazon
- Flipkart
- Meesho
- Walmart Marketplace
- Stripe
- Razorpay
- PayPal
- Shopify
- Banking
- Insurance
- FinTech

---

-->  Team

Sai Vishal S.

B.Tech CSE (AI & Autonomous Systems)

KL University

---

-->  License

This project is released under the MIT License.

---

-->  Acknowledgements

- React
- Flask
- NetworkX
- Scikit-learn
- Tailwind CSS
- React Flow
- Recharts
- Framer Motion

---

--!! ⭐️ If you found this project interesting, consider giving it a star!
