@echo off
REM Expo Mobile App Starter - EXPO GO
cd /d "%~dp0expo-mobile"

cls
color 06
echo.
echo ╔════════════════════════════════════════╗
echo ║                                        ║
echo ║  AGRO-VISSION MOBILE APP - EXPO GO     ║
echo ║                                        ║
echo ║  📱 Scan the QR code with Expo Go      ║
echo ║                                        ║
echo ║  ✓ Phone on same WiFi as PC          ║
echo ║  ✓ Auto LAN ^& Offline AI Ready        ║
echo ║                                        ║
echo ╚════════════════════════════════════════╝
echo.
echo Starting Metro for Expo Go...
echo.
timeout /t 2 /nobreak

echo.
echo ════════════════════════════════════════
echo QR code appears below:
echo ════════════════════════════════════════
echo.

npm start

pause
