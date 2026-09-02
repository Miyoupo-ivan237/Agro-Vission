# Start Expo Mobile (AGROVISSION)
Write-Host "=== Starting AGROVISSION Mobile App (Expo 57) ===" -ForegroundColor Cyan
Set-Location "C:\Users\FixUser\Desktop\Agro-Vission\expo-mobile"

$env:REACT_NATIVE_PACKAGER_HOSTNAME = "192.168.1.81"
Write-Host "=== Metro Bundler Host: 192.168.1.81 (LAN Mode) ===" -ForegroundColor Yellow
Write-Host "=== Launching Metro & Displaying QR Code... ===" -ForegroundColor Green

npx expo start --lan -c