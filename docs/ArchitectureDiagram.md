# 📚 Library Lending App – Architecture Overview

This document outlines the architecture of the **Library Lending App**, a Next.js-based application deployed on AWS EKS. The app supports user login, book inventory, search, borrow/return workflows, and an admin dashboard.

---

## 🧩 Core Features

- User authentication via GitHub OAuth (NextAuth.js)
- Book search and inventory management
- Borrow/return workflow for users
- Admin dashboard for operational tasks
- CI/CD with automated testing, security scanning, and Kubernetes deployment
- Observability via metrics, logs, and dashboards

---

## 🗺️ Architecture Diagram

*(To be added separately – diagram includes components listed below)*

---

## 🏗️ Architecture Components

### 1. Client Layer
- **Browser-based Frontend**
  - Built with Next.js (Server-side and Client-side Rendering)
  - Communicates with backend via HTTPS
  - Handles auth redirect flows using NextAuth.js

---

### 2. Application Layer (Deployed to AWS EKS)
- **Next.js Application (Pod)**
  - Serves frontend pages and handles API routes
  - Uses Prisma ORM to interact with PostgreSQL
  - Caches frequently accessed data using Redis

- **Redis (Pod)**
  - In-memory cache used for session data and app-level caching
  - Optional: set up in HA mode for resilience

- **Playwright Test Runner (Ephemeral Pod)**
  - Launched post-deployment from CI/CD
  - Performs end-to-end regression tests

---

### 3. Authentication
- **NextAuth.js**
  - Authentication managed through GitHub OAuth
  - Session data stored in Redis or DB
- **GitHub OAuth**
  - Acts as the Identity Provider (IdP)

---

### 4. Data Layer
- **PostgreSQL (AWS RDS)**
  - Relational database for storing users, books, transactions, and roles
  - Accessed via Prisma ORM

- **Object Storage (Optional – AWS S3)**
  - For storing static assets like book cover images

---

### 5. CI/CD Pipeline
- **GitHub Actions**
  - Runs on every push and pull request
  - Pipeline steps include:
    - Linting and Unit Testing
    - Building Docker Image
    - Container Security Scan using **Trivy**
    - Static Code Analysis via **SonarQube**
    - Push to container registry (GitHub Packages or Amazon ECR)
    - Helm-based deployment to EKS
    - Post-deploy regression tests using **Playwright**

- **Helm**
  - Manages Kubernetes deployment manifests
  - Supports rollbacks and environment-specific overrides

---

### 6. Observability Stack
- **Prometheus**
  - Scrapes metrics from app pods and system services

- **Grafana**
  - Visualizes metrics from Prometheus
  - Used for alerting and operational monitoring

- **Elasticsearch (Open Source)**
  - Aggregates logs from application and system components

- **Fluent Bit / Fluentd**
  - Deployed as DaemonSet to ship logs from EKS nodes to Elasticsearch

---

### 7. Networking and Security

- **Ingress Controller (AWS ALB)**
  - Routes HTTPS traffic to Next.js application service
  - TLS termination handled at the ingress level

- **Security Scanners**
  - **Trivy**: container vulnerability scanning during CI
  - **SonarQube**: code quality and vulnerability detection

- **IAM Roles for Service Accounts (IRSA)**
  - Securely grants pods scoped access to AWS resources

- **Kubernetes Secrets / SealedSecrets**
  - Manages sensitive configuration data securely

---

## 🚧 Future Considerations

- Implement rate limiting and API throttling for abuse prevention
- Enable OPA/Gatekeeper for policy-based governance
- Add Sentry or similar for error tracking

---