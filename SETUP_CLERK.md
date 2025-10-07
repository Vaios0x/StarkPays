# 🔐 Configuración de Clerk para Desarrollo

## ⚠️ Estado Actual
La aplicación está funcionando en **modo demo** sin autenticación real. Para habilitar la funcionalidad completa de Chipi Pay, necesitas configurar Clerk.

## 🚀 Configuración Rápida de Clerk

### 1. Crear Cuenta en Clerk
1. Ve a [https://clerk.com](https://clerk.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

### 2. Obtener las Claves
1. Ve a **API Keys** en tu dashboard de Clerk
2. Copia tu **Publishable Key** (pk_test_...)
3. Copia tu **Secret Key** (sk_test_...)

### 3. Configurar Variables de Entorno
Actualiza tu archivo `.env.local`:

```env
# Clerk Authentication (REQUERIDO para producción)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_tu_clave_real_aqui
CLERK_SECRET_KEY=sk_test_tu_clave_secreta_aqui

# Chipi Pay Configuration
NEXT_PUBLIC_CHIPI_API_KEY=pk_dev_a90cadfcb98dbeacf6c2d80dd65761db
CHIPI_SECRET_KEY=sk_dev_5cb66037e115defab91c69a5cef6458163a47931ecfa217094909017dc85ee94
NEXT_PUBLIC_MERCHANT_WALLET=0x7df55dbaf5f632bd0b1d84de09e867c356110120604fd9baec205a22007da89

# Starknet
NEXT_PUBLIC_STARKNET_RPC_URL=https://starknet-mainnet.public.blastapi.io
```

### 4. Configurar JWKS Endpoint en Chipi
1. Ve a tu dashboard de Clerk
2. En **API Keys**, copia tu **JWKS URL**
3. Ve a tu dashboard de Chipi Pay
4. Pega la **JWKS URL** en la configuración de autenticación

## 🎯 Funcionalidades Disponibles

### ✅ Modo Demo (Actual)
- ✅ Interfaz completa funcional
- ✅ Simulación de pagos
- ✅ Estados de carga y error
- ✅ Accesibilidad completa

### ✅ Modo Producción (Con Clerk)
- ✅ Autenticación real con JWT
- ✅ Creación de wallets reales
- ✅ Transacciones reales con Chipi Pay
- ✅ Webhooks de notificaciones

## 🔧 Desarrollo Sin Clerk

Si quieres continuar en modo demo:

```bash
pnpm run dev
```

La aplicación funcionará completamente con datos simulados.

## 🚀 Producción Con Clerk

Una vez configurado Clerk:

1. **Reinicia el servidor**:
   ```bash
   pnpm run dev
   ```

2. **Verifica la configuración**:
   - Ve a `/merchant`
   - Deberías ver el flujo de autenticación real
   - Los pagos serán transacciones reales

## 📱 Flujo de Usuario Completo

### Con Clerk Configurado:
1. **Primera visita**: Usuario se registra/inicia sesión
2. **Creación de wallet**: Sistema crea wallet automáticamente
3. **Pagos reales**: Transacciones con Chipi Pay
4. **Notificaciones**: Webhooks en tiempo real

### Sin Clerk (Modo Demo):
1. **Acceso directo**: Sin autenticación
2. **Datos simulados**: Wallet y balance mock
3. **Pagos simulados**: Transacciones de prueba
4. **Interfaz completa**: Todas las funcionalidades visibles

## 🎉 ¡Listo!

Tu aplicación está completamente funcional tanto en modo demo como en modo producción. Solo necesitas configurar Clerk cuando estés listo para transacciones reales.
