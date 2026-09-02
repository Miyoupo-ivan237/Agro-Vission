@echo off
cls
title Agro-Vission Expo QR
cd /d C:\Users\FixUser\Desktop\Agro-Vission\expo-mobile

echo.
echo ==========================================================
echo    Agro-Vission Expo QR Code Launcher
echo ==========================================================
echo.
echo This opens the Expo QR code so you can scan it with Expo Go.
echo It uses the offline mode to avoid SDK fetch errors.
echo.
call npx expo start --offline --tunnel --port 8082
