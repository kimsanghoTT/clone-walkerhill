import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header/header";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], 
  display: "swap",
});

export const metadata: Metadata = {
  title: "워커힐 호텔 | WALKERHILL HOTELS & RESORTS",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="ko" className={notoSansKR.className}>
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
