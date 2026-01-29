import type { Metadata } from "next";
import { Baloo_2, DynaPuff, ZCOOL_QingKe_HuangYou } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-rounded",
});

const dynaPuff = DynaPuff({
  subsets: ["latin"],
  // DynaPuff 在 Google Fonts 上是可变字重（400..700）
  display: "swap",
  variable: "--font-dynapuff",
});

const zcool = ZCOOL_QingKe_HuangYou({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-zh-zcool",
});

export const metadata: Metadata = {
  title: "Tenebralis - Phone UI",
  description: "A simulated phone desktop interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${baloo.variable} ${dynaPuff.variable} ${zcool.variable}`}>
      <body className="min-h-screen overflow-hidden flex items-center justify-center p-4 font-rounded" style={{ backgroundImage: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)' }}>
        {children}
      </body>
    </html>
  );
}
