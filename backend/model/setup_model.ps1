Write-Host "===================================================" -ForegroundColor Green
Write-Host "  CREATING AGRO-VISSION OLLAMA AGRICULTURAL MODEL  " -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green
ollama create agrovission-agronomist -f "$PSScriptRoot\Modelfile.agronomist"
Write-Host "Done! Model 'agrovission-agronomist' is ready." -ForegroundColor Cyan
