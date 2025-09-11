import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header/header";

export const metadata: Metadata = {
  title: "워커힐 호텔 | WALKERHILL HOTELS & RESORTS",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="ko">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
