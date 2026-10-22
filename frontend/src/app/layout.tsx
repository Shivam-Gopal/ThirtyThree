import type { Metadata, Viewport } from "next";
import "@fontsource/big-shoulders-display/latin-600";
import "@fontsource/big-shoulders-display/latin-700";
import "@fontsource/big-shoulders-display/latin-800";
import "@fontsource/big-shoulders-display/latin-900";
import "@fontsource/inter/latin-400";
import "@fontsource/inter/latin-500";
import "@fontsource/inter/latin-600";
import "@fontsource/inter/latin-700";
import "@fontsource/inter/latin-800";
import "@fontsource/ibm-plex-mono/latin-500";
import "@fontsource/ibm-plex-mono/latin-600";
import "@fontsource/oswald/latin-600";
import "@fontsource/anton/latin-400";
import "./globals.css";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { PageLoader } from "@/app/components/layout/PageLoader";
import { ScrollProgress } from "@/app/components/layout/ScrollProgress";
import { CustomCursor } from "@/app/components/layout/CustomCursor";
import { WhatsAppFloat } from "@/app/components/layout/WhatsAppFloat";
import { getNavLinks, getSite } from "@/app/lib/content";
import { Analytics } from "@vercel/analytics/next";

const site = getSite();

export const metadata: Metadata = {
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
};
export const viewport: Viewport = { themeColor: "#121009", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-ink antialiased">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}body.tt-loading{overflow:auto}`}</style>
        </noscript>
        <PageLoader />
        <ScrollProgress />
        <CustomCursor />
        <Navbar links={getNavLinks()} />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
