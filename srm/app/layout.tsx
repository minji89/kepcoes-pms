import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "전자입찰시스템 | KEPCO ES",
  description: "켑코이에스 전자입찰시스템 협력업체 전용 창구",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
