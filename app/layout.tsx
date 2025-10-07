import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "StarkPays Neural - Envía dinero con IA que protege a tu familia",
  description: "La primera plataforma de remesas con Inteligencia Artificial Neural que detecta fraudes y protege a tu familia. Comisiones desde 0.5%.",
  keywords: ["remesas", "mexico", "enviar dinero", "starknet", "crypto", "AI", "neural", "blockchain"],
  openGraph: {
    title: "StarkPays Neural - IA que protege familias",
    description: "Envía dinero a México con la seguridad de IA Neural. Comisiones desde 0.5%",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body 
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}