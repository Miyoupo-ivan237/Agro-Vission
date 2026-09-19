@echo off
REM Backend Server Starter
cd /d "%~dp0backend"

cls
color 02
echo.
echo ═════════════════════════════════════════
echo   AGRO-VISSION BACKEND SERVER
echo ═════════════════════════════════════════
echo.
echo Port: 5000
echo API URL: http://192.168.42.199:5000
echo Database: PostgreSQL
echo.
echo Starting Node.js backend...
echo.

node src/index.js

pause
