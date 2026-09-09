@echo off
setlocal enabledelayedexpansion

cls
echo.
echo ========================================
echo   Agro-Vission Complete Startup Script
echo ========================================
echo.
echo This will launch:
echo   1. Backend API (Port 5000)
echo   2. Admin Dashboard (Port 3000)
echo   3. Mobile App Web (Port 8081)
echo.
echo Press ANY KEY to start all three services...
pause >nul

echo.
echo Starting Backend...
start "Agro-Vission Backend" cmd /k "cd /d "%~dp0backend" && node src/index.js"

timeout /t 2 /nobreak

echo Starting Admin Dashboard...
start "Agro-Vission Admin" cmd /k "cd /d "%~dp0Admin" && npm run dev"

timeout /t 2 /nobreak

echo Starting Mobile App (Web)...
start "Agro-Vission Mobile" cmd /k "cd /d "%~dp0expo-mobile" && npm run web"

echo.
echo ========================================
echo All services starting...
echo ========================================
echo.
echo Access your app:
echo   Backend:  http://localhost:5000
echo   Admin:    http://localhost:3000
echo   Mobile:   http://localhost:8082
echo.
echo To stop, close the individual windows.
echo.
pause
