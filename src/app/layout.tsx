import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Life in Cars",
  description: "A timeline of automotive excellence - Document your personal car history",
  keywords: ["cars", "automotive", "timeline", "collection", "memories"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
