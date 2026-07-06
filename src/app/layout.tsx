import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { MicrosoftClarity } from "@/components/analytics/microsoft-clarity";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, siteNavigationSchema, webSiteSchema } from "@/lib/seo-schema";
import { createRootMetadata } from "@/lib/seo";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = createRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={[organizationSchema(), webSiteSchema(), siteNavigationSchema()]} />
        {children}
        <MicrosoftClarity />
        <Analytics />
      </body>
    </html>
  );
}
