$project = Join-Path $PSScriptRoot 'expo-mobile'
$owners = (Get-NetTCPConnection -LocalPort 8082 -State Listen -ErrorAction SilentlyContinue).OwningProcess
if ($owners) {
  $owners | Sort-Object -Unique | ForEach-Object {
    Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
  }
}

Set-Location $project
$env:EXPO_OFFLINE = 'true'
$env:EXPO_PUBLIC_API_URL = 'http://127.0.0.1:5000'
& (Join-Path $project 'node_modules\.bin\expo.cmd') start --localhost --port 8082
