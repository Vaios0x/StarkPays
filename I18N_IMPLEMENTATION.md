# Implementación de Internacionalización (i18n) - StarkPays

## Resumen

Se ha implementado un sistema completo de internacionalización para StarkPays usando Next.js 15 y next-intl, soportando español (es-MX) e inglés (en) como idiomas principales.

## Estructura Implementada

### 1. Configuración Base

- **Middleware**: `middleware.ts` - Maneja la detección de idioma y redirección
- **Configuración i18n**: `i18n.ts` - Configuración de next-intl
- **Next.js Config**: `next.config.js` - Integración con next-intl plugin

### 2. Estructura de Archivos

```
app/
├── layout.tsx                 # Layout raíz
├── page.tsx                   # Redirección a idioma por defecto
├── [locale]/                  # Rutas internacionalizadas
│   ├── layout.tsx            # Layout con soporte i18n
│   ├── page.tsx              # Página principal
│   └── (dashboard)/          # Páginas del dashboard
└── providers.tsx              # Providers de React Query

public/locales/
├── es-MX.json                # Traducciones en español
└── en.json                   # Traducciones en inglés

components/
├── ui/
│   └── LanguageSwitcher.tsx  # Componente selector de idioma
└── layout/
    ├── Navbar.tsx            # Navegación con i18n
    └── Footer.tsx            # Footer con i18n

lib/hooks/
└── useTranslations.ts        # Hook personalizado para traducciones
```

### 3. Características Implementadas

#### ✅ Configuración Completa
- [x] Middleware de detección de idioma
- [x] Configuración de next-intl
- [x] Estructura de carpetas [locale]
- [x] Redirección automática a idioma por defecto

#### ✅ Componentes Internacionalizados
- [x] Navbar con selector de idioma
- [x] Footer completamente traducido
- [x] HeroSection con traducciones
- [x] FeaturesSection con traducciones
- [x] Páginas de dashboard (send, tandas)

#### ✅ Selector de Idioma
- [x] Componente LanguageSwitcher
- [x] Interfaz responsive
- [x] Animaciones con Framer Motion
- [x] Accesibilidad (aria-labels, tabIndex)

#### ✅ Traducciones Completas
- [x] Navegación y menús
- [x] Formularios y botones
- [x] Mensajes de error y éxito
- [x] Contenido de páginas principales
- [x] Footer y enlaces

### 4. Uso de Traducciones

#### Hook Personalizado
```typescript
import { useTranslations } from "next-intl";

function MyComponent() {
  const t = useTranslations();
  
  return (
    <h1>{t('hero.title')}</h1>
  );
}
```

#### Con Parámetros
```typescript
// En el archivo de traducción
"security_score": "Score de seguridad: {score}/100"

// En el componente
t('send.security_score', { score: 85 })
```

#### Formateo de Datos
```typescript
import { useTranslations } from "@/lib/hooks/useTranslations";

function MyComponent() {
  const { t, formatCurrency, formatDate } = useTranslations();
  
  return (
    <div>
      <p>{t('common.amount')}: {formatCurrency(100, 'USD')}</p>
      <p>{formatDate(new Date())}</p>
    </div>
  );
}
```

### 5. Estructura de Traducciones

Las traducciones están organizadas en secciones lógicas:

```json
{
  "common": { ... },           // Textos comunes
  "navigation": { ... },       // Navegación
  "hero": { ... },            // Sección principal
  "features": { ... },        // Características
  "send": { ... },            // Página de envío
  "tandas_page": { ... },     // Página de tandas
  "footer": { ... },          // Footer
  "errors": { ... },          // Mensajes de error
  "success": { ... },         // Mensajes de éxito
  "ai": { ... },              // IA y protección
  "wallet": { ... }           // Wallet y conexión
}
```

### 6. Rutas Internacionalizadas

- `/` → Redirige a `/es-MX`
- `/es-MX` → Página principal en español
- `/en` → Página principal en inglés
- `/es-MX/send` → Página de envío en español
- `/en/send` → Página de envío en inglés

### 7. Características Técnicas

#### Middleware Inteligente
- Detección automática de idioma del navegador
- Redirección a idioma por defecto (es-MX)
- Manejo de rutas sin locale

#### Selector de Idioma
- Cambio dinámico sin recarga de página
- Persistencia de preferencia del usuario
- Interfaz accesible y responsive

#### Optimizaciones
- Carga lazy de traducciones
- Caché de mensajes
- Soporte para SSR/SSG

### 8. Próximos Pasos

#### Para Agregar Nuevos Idiomas
1. Crear archivo `public/locales/[locale].json`
2. Agregar locale a `middleware.ts`
3. Actualizar `i18n.ts`

#### Para Agregar Nuevas Traducciones
1. Agregar clave al archivo JSON correspondiente
2. Usar `t('nueva.clave')` en el componente
3. Actualizar ambos idiomas

### 9. Comandos Útiles

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Construcción
pnpm build

# Verificar traducciones
pnpm lint
```

### 10. Consideraciones de Accesibilidad

- [x] aria-labels en selector de idioma
- [x] Navegación por teclado
- [x] Indicadores visuales claros
- [x] Contraste adecuado
- [x] Textos descriptivos

## Conclusión

La implementación de i18n está completa y funcional, proporcionando una experiencia de usuario fluida en español e inglés, con la capacidad de expandir fácilmente a más idiomas en el futuro.
