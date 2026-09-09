@echo off
title Agro-Vission Admin Dashboard
cd /d "%~dp0Admin"
echo.
echo Starting Next.js Admin Portal on http://localhost:3000...
echo.
call npm run dev
