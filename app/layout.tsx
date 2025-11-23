import type { Metadata } from "next";
import { Providers } from "./providers";
import "../src/index.css";

export const metadata: Metadata = {
  title: "BeerClicker",
  description: "An idle beer clicking game",
  icons: {
    icon: "/beer.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </body>
    </html>
  );
}
