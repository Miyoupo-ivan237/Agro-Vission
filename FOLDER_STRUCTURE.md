# Agro-Vission — Project Architecture & 4-Folder Arrangement

The project is strictly organized into **ONLY 4 MAIN FOLDERS**:

```
Agro-Vission/
│
├── 📱 expo-mobile/   ──> Mobile Application (React Native + Expo)
├── ⚙️ backend/       ──> REST API Server & Database (Node.js + Express + Prisma)
├── 💻 Admin/         ──> Web Admin Dashboard (Next.js + Tailwind CSS)
└── 🧠 AI/            ──> AI & Machine Learning Services (Diagnosis & Ollama)
```

---

## 1. 📱 `expo-mobile/` — Mobile Application
* **Purpose:** Mobile app running on farmers' and field agents' smartphones (Android / iOS).
* **Tech Stack:** React Native, Expo SDK 52/53, Offline-first architecture.
* **Key Features:**
  - AI Crop Disease Scanner using Camera & Gallery (`expo-image-picker`).
  - Offline crop disease diagnosis (9 Cameroonian crops, 40+ diseases).
  - Agronomist AI chat assistant (works 100% offline).
  - Role-based Authentication (Farmer & Admin access).
  - 100% Local Notifications (no push token / remote server dependency).
  - Dual language support (English & Français).
* **How to run:**
  ```bash
  cd expo-mobile
  npm run start-clear
  ```

---

## 2. ⚙️ `backend/` — REST API Server
* **Purpose:** Central backend providing RESTful endpoints for user management, survey data, reports, and persistent storage.
* **Tech Stack:** Node.js, Express.js, Prisma ORM, SQLite / PostgreSQL.
* **Key Features:**
  - JWT Authentication & authorization.
  - Farmer registration and profile management.
  - Disease diagnosis recording and analytics endpoints.
  - Survey and feedback collection APIs.
  - Local database migrations with Prisma.
* **How to run:**
  ```bash
  cd backend
  node src/index.js
  ```

---

## 3. 💻 `Admin/` — Web Administration Portal
* **Purpose:** Desktop/Web browser interface for administrators, agronomists, and supervisors.
* **Tech Stack:** Next.js (React), Tailwind CSS, Lucide icons.
* **Key Features:**
  - Farmer directory and account administration.
  - National / Regional disease outbreak tracking & heatmaps.
  - Broadcast notification center to dispatch agronomy alerts.
  - AI model status, performance telemetry, and system uptime.
* **How to run:**
  ```bash
  cd Admin
  npm run dev
  ```

---

## 4. 🧠 `AI/` — AI & Machine Learning Services
* **Purpose:** Independent machine learning modules, diagnosis models, agronomic recommendation algorithms, and local LLM integration.
* **Tech Stack:** TensorFlow.js, Python/Node model runtimes, Ollama (Llama/Mistral models).
* **Key Features:**
  - `diagnosis/`: Leaf image analysis and symptom matching rules.
  - `recommendation/`: Soil, climate, and crop schedule advisors.
  - `agronomist/`: Agricultural question answering engine via local Ollama.
* **How to run / test:**
  ```bash
  cd AI
  node index.js
  ```
