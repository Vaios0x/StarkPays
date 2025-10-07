import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      description, 
      contributionAmount, 
      frequencyDays, 
      maxMembers, 
      token,
      creator 
    } = body;

    // Validar datos de entrada
    if (!name || !description || !contributionAmount || !maxMembers || !creator) {
      return NextResponse.json(
        { error: "Datos requeridos faltantes" },
        { status: 400 }
      );
    }

    // Validar rangos
    if (contributionAmount < 10 || contributionAmount > 10000) {
      return NextResponse.json(
        { error: "Monto de contribución debe estar entre $10 y $10,000" },
        { status: 400 }
      );
    }

    if (maxMembers < 2 || maxMembers > 20) {
      return NextResponse.json(
        { error: "Número de miembros debe estar entre 2 y 20" },
        { status: 400 }
      );
    }

    if (![7, 14, 30].includes(frequencyDays)) {
      return NextResponse.json(
        { error: "Frecuencia debe ser 7, 14 o 30 días" },
        { status: 400 }
      );
    }

    // Simular creación de tanda
    const tandaId = `tanda_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const contractAddress = `0x${Math.random().toString(16).substr(2, 40)}`;

    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));

    return NextResponse.json({
      success: true,
      tandaId,
      contractAddress,
      status: "active",
      createdAt: new Date().toISOString(),
      totalPool: contributionAmount * maxMembers,
      estimatedDuration: maxMembers * frequencyDays,
      aiProtection: {
        enabled: true,
        fraudDetection: true,
        patternAnalysis: true,
        trustScoring: true
      },
      message: "Tanda creada exitosamente"
    });

  } catch (error) {
    console.error("Error creating tanda:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
