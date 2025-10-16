# Script de despliegue directo usando API de Starknet
$RPC_URL = "https://starknet-sepolia.public.blastapi.io"
$PRIVATE_KEY = "0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892"
$ACCOUNT_ADDRESS = "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769"

Write-Host "🎯 Desplegando contratos con API directa de Starknet..." -ForegroundColor Green
Write-Host "💰 Cuenta: $ACCOUNT_ADDRESS" -ForegroundColor Yellow

# Función para hacer llamadas a la API
function Invoke-StarknetAPI {
    param(
        [string]$Method,
        [object]$Params
    )
    
    $body = @{
        jsonrpc = "2.0"
        method = $Method
        params = $Params
        id = 1
    } | ConvertTo-Json -Depth 10
    
    try {
        $response = Invoke-RestMethod -Uri $RPC_URL -Method POST -Body $body -ContentType "application/json"
        return $response
    }
    catch {
        Write-Host "❌ Error en API call: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Verificar balance de la cuenta
Write-Host "🔍 Verificando balance de la cuenta..." -ForegroundColor Cyan
$balanceResponse = Invoke-StarknetAPI -Method "starknet_getBalance" -Params @{
    contract_address = $ACCOUNT_ADDRESS
    block_id = "latest"
}

if ($balanceResponse -and $balanceResponse.result) {
    $balance = [System.Numerics.BigInteger]::Parse($balanceResponse.result.TrimStart('0x'), 'AllowHexSpecifier')
    $balanceETH = $balance / [System.Numerics.BigInteger]::Pow(10, 18)
    Write-Host "💰 Balance: $balanceETH ETH" -ForegroundColor Green
} else {
    Write-Host "⚠️  No se pudo verificar el balance" -ForegroundColor Yellow
}

# Verificar nonce
Write-Host "🔍 Verificando nonce de la cuenta..." -ForegroundColor Cyan
$nonceResponse = Invoke-StarknetAPI -Method "starknet_getNonce" -Params @{
    contract_address = $ACCOUNT_ADDRESS
    block_id = "latest"
}

if ($nonceResponse -and $nonceResponse.result) {
    Write-Host "✅ Nonce: $($nonceResponse.result)" -ForegroundColor Green
} else {
    Write-Host "❌ Error obteniendo nonce: $($nonceResponse.error.message)" -ForegroundColor Red
    Write-Host "🔧 La cuenta puede no estar completamente activada" -ForegroundColor Yellow
}

Write-Host "`n🎉 Script completado!" -ForegroundColor Green
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. 📱 Verifica que tu cuenta ArgentX esté activada" -ForegroundColor White
Write-Host "2. 🔗 Ve a: https://sepolia.starkscan.co/account/$ACCOUNT_ADDRESS" -ForegroundColor White
Write-Host "3. 🚀 Usa Remix IDE para desplegar contratos" -ForegroundColor White
