import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, amount, token, message, aiScore } = body;

    // Validar datos de entrada
    if (!to || !amount || !token) {
      return NextResponse.json(
        { error: "Datos requeridos faltantes" },
        { status: 400 }
      );
    }

    // Verificar score de IA
    if (aiScore > 80) {
      return NextResponse.json(
        { 
          error: "Transacción bloqueada por seguridad",
          reason: "Score de riesgo alto detectado",
          aiScore 
        },
        { status: 403 }
      );
    }

    // Simular procesamiento de pago
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;

    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      paymentId,
      transactionHash,
      status: "pending",
      gasUsed: "0.02",
      strategy: aiScore < 10 ? "chipi-sponsored" : "avnu-usdc",
      estimatedTime: "5 minutes",
      message: "Pago iniciado exitosamente"
    });

  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
