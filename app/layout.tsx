import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Barueri Data Hub — Dados Públicos do Município",
  description:
    "Plataforma de visualização de dados públicos de Barueri/SP: saúde, economia, educação e população.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex" style={{ backgroundColor: "var(--color-bg)" }}>
        <Sidebar />
        <main className="flex-1 ml-64 min-h-screen p-6 lg:p-8">{children}</main>
      </body>
    </html>
  );
}
