@echo off
title Agro-Vission Ecosystem Launcher
echo ===================================================
echo   STARTING AGRO-VISSION (BACKEND + MOBILE + AI)
echo ===================================================
echo.
echo 1. Checking Ollama Local AI Service & agrovission-agronomist...
start "Ollama Service" /min powershell -NoProfile -ExecutionPolicy Bypass -Command "ollama serve"
timeout /t 2 /nobreak >nul

echo 2. Launching Backend Server on port 5000 (PostgreSQL + AI Engine)...
start "Agro-Vission Backend" powershell -NoProfile -ExecutionPolicy Bypass -NoExit -Command "Set-Location '%~dp0backend'; Write-Host '=== Starting Agro-Vission Backend (PostgreSQL + AI Engine)... ===' -ForegroundColor Green; node src/index.js"

echo 3. Launching Expo Mobile App (LAN QR Code)...
start "Agro-Vission Expo Mobile" powershell -NoProfile -ExecutionPolicy Bypass -NoExit -Command "Set-Location '%~dp0expo-mobile'; $env:REACT_NATIVE_PACKAGER_HOSTNAME='192.168.1.81'; Write-Host '=== Starting Expo Mobile (PACNOVA)... ===' -ForegroundColor Cyan; npx expo start --lan -c"

echo ===================================================
echo   Agro-Vission Services Active:
echo   - Backend Server (Port 5000 + PostgreSQL)
echo   - TensorFlow Disease Pathology Engine
echo   - Cameroon 10-Region Crop Recommendation Engine
echo   - Ollama Local Agronomist Model
echo   - Expo Mobile Application
echo ===================================================
echo.
pause