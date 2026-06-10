import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ay! — Recursos interactivos para eventos en vivo",
  description:
    "Diseñamos dinámicas digitales rápidas, personalizadas y medibles para captar datos, entretener audiencias y generar contenido en tiempo real.",
  openGraph: {
    title: "Ay! — Recursos interactivos para eventos en vivo",
    description:
      "Diseñamos dinámicas digitales rápidas, personalizadas y medibles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
