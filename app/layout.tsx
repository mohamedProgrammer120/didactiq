import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Didactiq — Plateforme pédagogique",
  description: "Diffusez vos séances d'enseignement explicite, générez des cartes mentales et travaillez hors-ligne.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0284c7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `try { const t = localStorage.getItem('didactiq-theme'); if (t === 'light') document.documentElement.classList.add('theme-light'); } catch {}`,
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
