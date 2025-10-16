# Configuración de Clerk para StarkPays

## Pasos para configurar Clerk

### 1. Crear cuenta en Clerk
1. Ve a [https://clerk.com](https://clerk.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto

### 2. Obtener las claves de API
1. En tu dashboard de Clerk, ve a **API Keys**
2. Copia tu **Publishable Key** y **Secret Key**
3. Agrega estas claves a tu archivo `.env.local`:

```bash
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_tu_clave_aqui
CLERK_SECRET_KEY=sk_test_tu_clave_secreta_aqui
```

### 3. Configurar URLs de redirección (opcional)
En tu dashboard de Clerk, configura:
- **Sign-in URL**: `/sign-in`
- **Sign-up URL**: `/sign-up`
- **After sign-in URL**: `/dashboard`
- **After sign-up URL**: `/dashboard`

## Componentes disponibles

### AuthButtons
Componente que muestra botones de inicio de sesión y registro:

```tsx
import { AuthButtons } from "@/components/auth/AuthButtons";

export default function Navbar() {
  return (
    <nav>
      <AuthButtons />
    </nav>
  );
}
```

### ProtectedRoute
Protege rutas que requieren autenticación:

```tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Contenido protegido</div>
    </ProtectedRoute>
  );
}
```

### useAuthData Hook
Hook personalizado para obtener datos de autenticación:

```tsx
import { useAuthData } from "@/lib/auth/useAuth";

export default function Profile() {
  const { user, isSignedIn, isLoading } = useAuthData();

  if (isLoading) return <div>Cargando...</div>;
  if (!isSignedIn) return <div>No autenticado</div>;

  return <div>Hola {user?.firstName}!</div>;
}
```

## Componentes de Clerk disponibles

- `<SignInButton>` - Botón para iniciar sesión
- `<SignUpButton>` - Botón para registrarse
- `<UserButton>` - Botón de perfil de usuario
- `<SignedIn>` - Contenido solo para usuarios autenticados
- `<SignedOut>` - Contenido solo para usuarios no autenticados

## Configuración del middleware

El middleware ya está configurado para proteger rutas automáticamente. Las rutas protegidas incluyen:
- `/dashboard/*`
- `/send/*`
- `/family-vault/*`

## Próximos pasos

1. Configura las claves de Clerk en `.env.local`
2. Reinicia tu servidor de desarrollo
3. Prueba el flujo de autenticación
4. Personaliza los componentes según tus necesidades
