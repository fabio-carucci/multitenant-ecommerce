import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Sellio",
  description: "Sellio, the best e-commerce platform",
  openGraph: {
    title: "Sellio",
    description: "Sellio, the best e-commerce platform",
    type: "website",
    locale: "en",
    siteName: "Sellio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sellio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sellio",
    description: "Sellio, the best e-commerce platform",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <NuqsAdapter>
          <TRPCReactProvider>
            {children}
            <Toaster richColors />
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
