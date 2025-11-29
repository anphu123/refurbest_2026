import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Refurbest - Thiết bị Refurbish chính hãng, Giá tốt nhất",
  description: "Refurbest - Chuyên cung cấp thiết bị Refurbish chính hãng, công nghệ tiên tiến. iPhone, Samsung, Xiaomi, Oppo với giá tốt nhất. Bảo hành chính hãng, giao hàng toàn quốc.",
  icons: {
    icon: "/Refurbest.png",
    shortcut: "/Refurbest.png",
    apple: "/Refurbest.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

