# Agro-Vission Ecosystem Launcher
Write-Host "===================================================" -ForegroundColor Green
Write-Host "  STARTING AGRO-VISSION (BACKEND + MOBILE + AI)   " -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $rootDir) { $rootDir = "C:\Users\FixUser\Desktop\Agro-Vission" }

Write-Host "1. Checking Ollama Local AI Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"ollama serve`"" -WindowStyle Hidden
Start-Sleep -Seconds 2

Write-Host "2. Launching Backend Server on port 5000 (PostgreSQL + AI Engine)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -NoExit -Command `"Set-Location '$rootDir\backend'; Write-Host '=== Starting Agro-Vission Backend... ===' -ForegroundColor Green; node src/index.js`""

Write-Host "3. Launching Expo Mobile App (LAN QR Code)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -NoExit -Command `"Set-Location '$rootDir\expo-mobile'; `$env:REACT_NATIVE_PACKAGER_HOSTNAME='192.168.1.81'; Write-Host '=== Starting Expo Mobile (PACNOVA)... ===' -ForegroundColor Cyan; npx expo start --lan -c`""

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  Agro-Vission Services Active!" -ForegroundColor Cyan
Write-Host "  - Backend Server (Port 5000 + PostgreSQL)" -ForegroundColor Cyan
Write-Host "  - TensorFlow Disease Pathology Engine" -ForegroundColor Cyan
Write-Host "  - Cameroon 10-Region Crop Recommendation Engine" -ForegroundColor Cyan
Write-Host "  - Ollama Local Agronomist Model (agrovission-agronomist)" -ForegroundColor Cyan
Write-Host "  - Expo Mobile Application (LAN Mode)" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan