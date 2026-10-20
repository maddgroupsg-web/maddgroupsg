import type { Metadata } from "next";
import { Bebas_Neue, Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["300", "400", "600", "700"], variable: "--font-josefin", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.maddspace.com.sg"),
  title: "Join MADDspace Singapore - Best Vocal & Dance Studio for Kids & Youth | Book Your Trial Class Today",
  description:
    "Join MADDspace, Singapore's top Performing Arts Studio, for singing, dancing, acting, and drama classes for your kids and teens. MADDspace Singapore also offers a comprehensive Direct Schools Admission DSA programme and more. Choose from a wide range of Sing & Dance, Hip Hop, K-Pop Dance classes and more.",
  openGraph: { siteName: "MADDspace", type: "website", locale: "en_SG" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} ${josefin.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-white">{children}</body>
    </html>
  );
}
