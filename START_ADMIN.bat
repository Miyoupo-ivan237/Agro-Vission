@echo off
title Agro-Vission Admin Dashboard
cd /d C:\Users\FixUser\Desktop\Agro-Vission\Admin
echo Installing dependencies...
call npm install
echo.
echo Starting Next.js Dev Server on http://localhost:3000...
echo.
call npx next dev -p 3000
