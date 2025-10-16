import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface RouteOption {
  provider: string;
  estimatedTime: number; // minutes
  fee: number; // USD
  reliability: number; // 0-100
}

const ROUTE_OPTIONS: RouteOption[] = [
  { provider: "Starknet-USDC", estimatedTime: 5, fee: 0.02, reliability: 99 },
  { provider: "Chipi-Pay", estimatedTime: 10, fee: 0.05, reliability: 98 },
  { provider: "SPEI-Bank", estimatedTime: 60, fee: 0.15, reliability: 95 },
  { provider: "Lightning-BTC", estimatedTime: 2, fee: 0.01, reliability: 92 },
  { provider: "Polygon-USDC", estimatedTime: 3, fee: 0.008, reliability: 97 },
];

export async function POST(req: NextRequest) {
  try {
    const { amount, urgency, userPreference } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Eres un optimizador de rutas de pago. Selecciona la mejor opción considerando:
- Urgencia (high/medium/low)
- Costo total
- Confiabilidad
- Preferencias del usuario

Responde SOLO con JSON:
{
  "recommendedRoute": string,
  "reasoning": string,
  "alternatives": string[],
  "estimatedSavings": number
}`,
        },
        {
          role: "user",
          content: JSON.stringify({
            amount,
            urgency,
            userPreference,
            availableRoutes: ROUTE_OPTIONS,
          }),
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const recommendation = JSON.parse(completion.choices[0].message.content || "{}");

    return NextResponse.json({
      ...recommendation,
      allRoutes: ROUTE_OPTIONS,
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error("Smart routing error:", error);
    return NextResponse.json(
      { error: "Routing optimization failed" },
      { status: 500 }
    );
  }
}
