@echo off
REM Expo Mobile App Starter - SHOWS QR CODE
cd /d "%~dp0expo-mobile"

cls
color 06
echo.
echo ╔════════════════════════════════════════╗
echo ║                                        ║
echo ║  AGRO-VISSION MOBILE APP - EXPO QR     ║
echo ║                                        ║
echo ║  📱 Scan QR Code with Expo Go App     ║
echo ║                                        ║
echo ║  ✓ Phone on same WiFi as PC          ║
echo ║  ✓ Auto LAN ^& Offline AI Ready        ║
echo ║                                        ║
echo ╚════════════════════════════════════════╝
echo.
echo Starting Expo in a few seconds...
echo.
timeout /t 2 /nobreak

echo.
echo ════════════════════════════════════════
echo QR CODE APPEARS BELOW:
echo ════════════════════════════════════════
echo.

npm start

pause
