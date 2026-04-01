import type { Metadata } from "next";
import { PortalShell } from "@/components/layout/portal-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GearGarage | Veiculos publicos",
    template: "%s | GearGarage",
  },
  description: "Portal publico para descoberta de carros e motos no Brasil.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full bg-brand-white text-brand-black">
        <PortalShell>{children}</PortalShell>
      </body>
    </html>
  );
}
