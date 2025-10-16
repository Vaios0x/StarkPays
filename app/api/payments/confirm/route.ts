import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, transactionHash } = body;

    // Validar datos de entrada
    if (!paymentId || !transactionHash) {
      return NextResponse.json(
        { error: "ID de pago y hash de transacción requeridos" },
        { status: 400 }
      );
    }

    // Simular confirmación de pago
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simular verificación de transacción
    const isConfirmed = Math.random() > 0.1; // 90% de éxito

    if (!isConfirmed) {
      return NextResponse.json(
        { 
          error: "Transacción falló",
          reason: "Gas insuficiente o transacción revertida"
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      paymentId,
      transactionHash,
      status: "completed",
      confirmedAt: new Date().toISOString(),
      blockNumber: Math.floor(Math.random() * 1000000) + 5000000,
      gasUsed: "0.02",
      message: "Pago confirmado exitosamente"
    });

  } catch (error) {
    console.error("Error confirming payment:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
