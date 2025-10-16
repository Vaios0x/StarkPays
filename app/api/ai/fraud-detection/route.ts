import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface FraudCheckRequest {
  sender: string;
  recipient: string;
  amount: number;
  currency: string;
  timestamp: number;
  userHistory: {
    avgAmount: number;
    frequency: number;
    lastTransactionTime: number;
    totalTransactions: number;
  };
}

export async function POST(req: NextRequest) {
  try {
    const data: FraudCheckRequest = await req.json();

    // AI fraud analysis
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Eres un experto en detección de fraudes financieros. Analiza patrones de transacciones y asigna un score de riesgo de 0-100.

Factores críticos:
- Montos inusuales comparado con historial
- Horarios atípicos (2am-6am = alto riesgo)
- Frecuencia anormal (múltiples en <1 hora)
- Cambios drásticos en comportamiento
- Destinatarios nuevos con montos altos

Responde SOLO con JSON:
{
  "riskScore": number (0-100),
  "reasons": string[],
  "recommendation": "approve" | "review" | "block",
  "confidence": number (0-100)
}`,
        },
        {
          role: "user",
          content: JSON.stringify({
            transaction: {
              amount: data.amount,
              hour: new Date(data.timestamp).getHours(),
              dayOfWeek: new Date(data.timestamp).getDay(),
            },
            userProfile: {
              avgAmount: data.userHistory.avgAmount,
              transactionFrequency: data.userHistory.frequency,
              timeSinceLastTx: data.timestamp - data.userHistory.lastTransactionTime,
              totalTxCount: data.userHistory.totalTransactions,
            },
          }),
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content || "{}");

    // Additional rule-based checks
    const ruleBasedScore = calculateRuleBasedScore(data);
    
    // Combine AI + rules
    const finalScore = Math.round((aiResponse.riskScore * 0.7) + (ruleBasedScore * 0.3));

    return NextResponse.json({
      riskScore: finalScore,
      aiAnalysis: aiResponse,
      ruleBasedScore,
      blocked: finalScore > 80,
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error("Fraud detection error:", error);
    return NextResponse.json(
      { error: "Fraud detection failed" },
      { status: 500 }
    );
  }
}

function calculateRuleBasedScore(data: FraudCheckRequest): number {
  let score = 0;

  // Amount check
  const amountRatio = data.amount / data.userHistory.avgAmount;
  if (amountRatio > 5) score += 30;
  else if (amountRatio > 3) score += 20;
  else if (amountRatio > 2) score += 10;

  // Time check (2am-6am high risk)
  const hour = new Date(data.timestamp).getHours();
  if (hour >= 2 && hour <= 6) score += 25;

  // Frequency check
  const timeSinceLast = data.timestamp - data.userHistory.lastTransactionTime;
  if (timeSinceLast < 300000) score += 20; // <5 minutes
  else if (timeSinceLast < 3600000) score += 10; // <1 hour

  // New user risk
  if (data.userHistory.totalTransactions < 3) score += 15;

  return Math.min(score, 100);
}
