# Agro-Vission (Smart Crop Disease Detection System)

Agro-Vission is an offline-first smart agriculture platform designed for African smallholder farmers and agricultural extension workers.

---

## 📂 Project Structure (4 Core Folders)

This repository contains strictly **4 components**:

| Folder | Name | Purpose | Tech Stack |
|---|---|---|---|
| 📱 **`expo-mobile/`** | Mobile Application | Offline AI scanner, disease diagnosis, farmer advisory | React Native, Expo |
| ⚙️ **`backend/`** | REST API & Database | Authentication, reports, survey data, Prisma DB | Node.js, Express, Prisma |
| 💻 **`Admin/`** | Admin Portal | Web dashboard for monitoring outbreaks & farmer accounts | Next.js, Tailwind CSS |
| 🧠 **`AI/`** | AI & ML Engines | Diagnosis logic, recommendation system, Ollama assistant | TensorFlow.js, Ollama |

---

## 🚀 Quick Start Commands

### 1. Run Mobile App:
```bash
cd expo-mobile
npm run start-clear
```

### 2. Run Backend Server:
```bash
cd backend
node src/index.js
```

### 3. Run Web Admin Dashboard:
```bash
cd Admin
npm run dev
```

### 4. Run / Test AI Services:
```bash
cd AI
node index.js
```

For complete details, see [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md).
