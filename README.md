# Agro-Vission

Mobile-first app for "Smart Crop Disease Detection System for Sustainable Agriculture".

Folders:
- `expo-mobile/` — React Native (Expo) front-end
- `backend/` — Node + Express + Prisma backend (SQLite by default)

To run locally:

1. Start the backend:

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
node src/index.js
```

2. Start the mobile app:

```bash
cd expo-mobile
npm install
npm start
```
"# MYAPP" 
"# MYAPP" 
