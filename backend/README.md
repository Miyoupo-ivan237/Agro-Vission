# Agro-Vission Backend

This backend uses Express + Prisma (SQLite for local development).

Quick start:

```bash
cd backend
npm install
# generate Prisma client
npx prisma generate
# run migrations and create dev.db
npx prisma migrate dev --name init
# start the server
node src/index.js
```

Notes:
- The default `DATABASE_URL` is set to `file:./dev.db` in `.env`.
- If PowerShell blocks `npm` scripts, open a regular Command Prompt and run the commands there.

API endpoints:
- `POST /api/register` { name, email, phone, password }
- `POST /api/login` { email, password }
