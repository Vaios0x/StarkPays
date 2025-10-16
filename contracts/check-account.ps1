# Script simple para verificar cuenta
$RPC_URL = "https://starknet-sepolia.public.blastapi.io"
$ACCOUNT_ADDRESS = "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769"

Write-Host "Verificando cuenta en Sepolia..." -ForegroundColor Green

# Verificar nonce
$body = @{
    jsonrpc = "2.0"
    method = "starknet_getNonce"
    params = @{
        contract_address = $ACCOUNT_ADDRESS
        block_id = "latest"
    }
    id = 1
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri $RPC_URL -Method POST -Body $body -ContentType "application/json"
    if ($response.result) {
        Write-Host "Cuenta activa! Nonce: $($response.result)" -ForegroundColor Green
    } else {
        Write-Host "Error: $($response.error.message)" -ForegroundColor Red
    }
}
catch {
    Write-Host "Error de conexion: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "Script completado!" -ForegroundColor Yellow
