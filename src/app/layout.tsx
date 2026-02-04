import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Covenant & Crown",
  description: "A year-long pilgrimage through the doctrines of grace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
