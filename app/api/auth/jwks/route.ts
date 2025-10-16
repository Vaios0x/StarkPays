import { NextResponse } from 'next/server';

export async function GET() {
  // JWKS endpoint para autenticación con Chipi Pay
  // Este endpoint debe ser configurado en el dashboard de Chipi Pay
  const jwks = {
    keys: [
      {
        kty: "RSA",
        use: "sig",
        kid: "chipi-jwt-key",
        x5t: "chipi-jwt-key",
        n: "your-public-key-modulus",
        e: "AQAB"
      }
    ]
  };

  return NextResponse.json(jwks);
}
