@echo off
REM Agro-Vission All Services Launcher
REM Opens 3 visible command windows for each service

cd /d "%~dp0"

cls
color 0B
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║         AGRO-VISSION ECOSYSTEM LAUNCHER                     ║
echo ║         Backend + Mobile + AI Services                      ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM Clean up any stuck processes
echo Cleaning up any existing services...
taskkill /IM ollama.exe /F >nul 2>&1
taskkill /IM node.exe /F >nul 2>&1
timeout /t 2 /nobreak

cls
color 0B
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║         AGRO-VISSION ECOSYSTEM LAUNCHER                     ║
echo ║         Backend + Mobile + AI Services                      ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo.
echo Opening 3 terminal windows...
echo.

REM Window 1: Ollama AI Service
echo [1/3] Opening Ollama AI Service window...
start "1-OLLAMA" cmd /k call start_ollama.bat
timeout /t 3 /nobreak

REM Window 2: Backend Server
echo [2/3] Opening Backend Server window...
start "2-BACKEND" cmd /k call start_backend.bat
timeout /t 2 /nobreak

REM Window 3: Expo Mobile App - QR CODE
echo [3/3] Opening Expo Mobile App window...
start "3-EXPO_MOBILE_QR_CODE" cmd /k call start_mobile.bat

echo.
echo.
cls
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║   ✓ AGRO-VISSION SERVICES LAUNCHING                         ║
echo ║                                                              ║
echo ║   Three terminal windows should have opened:                ║
echo ║                                                              ║
echo ║   🦙  1. OLLAMA - AI Service (Magenta/Purple)              ║
echo ║      Shows: Local LLM initialization                       ║
echo ║                                                              ║
echo ║   🖥️   2. BACKEND - API Server (Green)                     ║
echo ║      Shows: Server running on port 5000                    ║
echo ║      Shows: API requests and database logs                 ║
echo ║   📱 3. EXPO MOBILE - AGRO-VISSION QR CODE (Cyan/Blue)     ║
echo ║      🔍 THIS WINDOW SHOWS THE QR CODE!                     ║
echo ║      Look for the ASCII QR code in this window             ║
echo ║                                                              ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║   WHAT TO DO NEXT:                                          ║
echo ║                                                              ║
echo ║   1. LOOK at the "EXPO MOBILE" window for QR CODE          ║
echo ║   2. Install Expo Go app on your phone                     ║
echo ║   3. Open Expo Go and tap "Scan QR Code"                   ║
echo ║   4. Point phone camera at the QR code                      ║
echo ║   5. Wait 30-45 seconds for app to load                    ║
echo ║                                                              ║
echo ║   ✓ Phone must be on same WiFi as this PC                  ║
echo ║   ✓ PC IP: 192.168.42.199                                  ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Windows opened! Check your screen for the three terminals.
echo.
echo Press any key to close this launcher window...
pause
