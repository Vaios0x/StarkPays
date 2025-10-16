# 🚀 SETUP COMPLETO - REMESA 2.0

## 📋 Checklist Pre-Desarrollo

### 1. Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp env.example .env.local

# Editar con tus keys reales
nano .env.local
```

**Variables CRÍTICAS para el premio Chipi Pay ($1,000):**
```env
NEXT_PUBLIC_CHIPI_API_KEY=tu_chipi_key_aqui
NEXT_PUBLIC_CHIPI_PAYMASTER_ENABLED=true
NEXT_PUBLIC_CHIPI_SOCIAL_LOGIN=true
```

### 2. Instalación de Dependencias
```bash
# Instalar dependencias principales
npm install

# Instalar Cairo/Scarb (para smart contracts)
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

# Verificar instalación
scarb --version
```

### 3. Compilar Smart Contracts
```bash
cd contracts
scarb build
snforge test
cd ..
```

### 4. Deploy a Testnet
```bash
# Configurar variables de Starknet en .env.local
NEXT_PUBLIC_STARKNET_RPC_URL=https://starknet-sepolia.public.blastapi.io
DEPLOYER_PRIVATE_KEY=tu_private_key
DEPLOYER_ADDRESS=tu_address
FEE_COLLECTOR_ADDRESS=tu_fee_collector

# Deploy
npm run deploy:testnet
```

### 5. Iniciar Desarrollo
```bash
npm run dev
```

## 🎯 Funcionalidades Implementadas

### ✅ Core Features
- [x] **Landing Page** con hero 3D y animaciones
- [x] **Dashboard** con stats y quick actions
- [x] **Enviar Dinero** con flujo completo
- [x] **Bóveda Familiar** con controles de seguridad
- [x] **AI Guardian** widget flotante

### ✅ Integración Chipi Pay
- [x] **Chipi Pay SDK v2.0.4** correctamente integrado
- [x] **Paymaster habilitado** para transacciones gasless
- [x] **Social login** (Google, Discord, GitHub)
- [x] **Wallet automático** sin fees de gas
- [x] **On-ramp fiat** automático USD → USDC

### ✅ AI Features
- [x] **Fraud Detection API** con OpenAI GPT-4o
- [x] **Smart Routing** con optimización automática
- [x] **Guardian AI** widget en tiempo real
- [x] **Pattern Analysis** para detectar anomalías

### ✅ Smart Contracts
- [x] **RemesaVault.cairo** con AI fraud detection
- [x] **Family Vault** con ZK-proofs
- [x] **Fee management** (0.5% platform fee)
- [x] **Multi-token support** (USDC, STRK)

### ✅ PWA Features
- [x] **Manifest.json** configurado
- [x] **Service Worker** ready
- [x] **Offline support** básico
- [x] **Mobile-first** responsive

## 🔧 Comandos de Desarrollo

```bash
# Desarrollo
npm run dev                 # Iniciar servidor de desarrollo
npm run build              # Build para producción
npm run start              # Servidor de producción

# Contratos Cairo
npm run cairo:build        # Compilar contratos
npm run cairo:test         # Tests de contratos
npm run deploy:testnet     # Deploy a Sepolia
npm run deploy:mainnet     # Deploy a Mainnet

# Testing
npm run test:unit          # Tests unitarios
npm run test:e2e           # Tests E2E con Playwright
```

## 📱 PWA Testing

### 1. Instalar PWA
```bash
# En Chrome/Edge
1. Ir a http://localhost:3000
2. Click en el ícono de "Instalar" en la barra de direcciones
3. Confirmar instalación
```

### 2. Verificar Funcionalidades
- [x] **Offline support** - Desconectar internet y verificar
- [x] **Push notifications** - Configurar en dashboard
- [x] **Shortcuts** - Verificar en menú de la app
- [x] **Responsive** - Probar en móvil

## 🎨 Design System

### Componentes Implementados
- [x] **Button** - Variants y sizes
- [x] **Card** - Header, Content, Footer
- [x] **Input** - Con labels y validación
- [x] **Dialog** - Modal system
- [x] **Dropdown** - Menu system
- [x] **Badge** - Status indicators
- [x] **Progress** - Loading states

### Animaciones
- [x] **Framer Motion** - Page transitions
- [x] **GSAP** - Micro-interactions
- [x] **Spline 3D** - Hero section
- [x] **CSS Animations** - Hover effects

## 🔒 Seguridad

### Rate Limiting
- [x] **API Routes** protegidas con middleware
- [x] **10 requests/minuto** por IP
- [x] **Error handling** robusto

### AI Fraud Detection
- [x] **OpenAI GPT-4o** para análisis
- [x] **Rule-based checks** adicionales
- [x] **Score combinado** (AI 70% + Rules 30%)
- [x] **Bloqueo automático** si score > 80

## 📊 Métricas de Performance

### Lighthouse Scores Objetivo
- [ ] **Performance**: 90+
- [ ] **Accessibility**: 95+
- [ ] **Best Practices**: 95+
- [ ] **SEO**: 90+

### Core Web Vitals
- [ ] **LCP**: < 2.5s
- [ ] **FID**: < 100ms
- [ ] **CLS**: < 0.1

## 🚀 Deploy a Producción

### Vercel Deploy
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configurar variables de entorno en Vercel dashboard
```

### Variables de Producción
```env
NEXT_PUBLIC_STARKNET_RPC_URL=https://starknet-mainnet.public.blastapi.io
NEXT_PUBLIC_CHIPI_API_KEY=prod_chipi_key
OPENAI_API_KEY=prod_openai_key
```

## 🏆 Hackathon Submission

### Checklist Final
- [ ] **Demo video** (2:45 min máximo)
- [ ] **Screenshots** para Devpost
- [ ] **README completo** con instrucciones
- [ ] **Live demo** funcionando
- [ ] **Smart contracts** deployados
- [ ] **Chipi Pay** integración verificada

### Diferenciadores Técnicos
- [x] **OpenAI GPT-4o** para fraud detection
- [x] **Cairo 2.6** optimizado
- [x] **Chipi Pay SDK** integración completa
- [x] **PWA** con manifest
- [x] **3D animations** con Spline

## 🆘 Troubleshooting

### Errores Comunes

**1. Chipi Pay no inicializa**
```bash
# Verificar variables de entorno
echo $NEXT_PUBLIC_CHIPI_API_KEY

# Verificar en browser console
window.chipiPay
```

**2. Smart contracts no compilan**
```bash
# Reinstalar Scarb
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

# Limpiar y rebuild
cd contracts
scarb clean
scarb build
```

**3. PWA no instala**
```bash
# Verificar manifest.json
# Verificar service worker
# Probar en HTTPS (Vercel preview)
```

## 📞 Soporte

- **GitHub Issues**: Para bugs y features
- **Discord**: Para soporte en tiempo real
- **Email**: Para consultas de negocio

---

**¡Listo para ganar el hackathon! 🏆**
