import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Css for JS Dev",
  description: "Eulier's Personal notes",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
