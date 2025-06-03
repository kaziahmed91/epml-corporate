import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Appshell from "@/components/Appshell/Appshell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EPML Properties | Premium Real Estate Development",
  description:
    "EPML Properties develops high-quality residential, commercial, and mixed-use properties with a focus on sustainability and community.",
  keywords:
    "real estate, property development, luxury homes, commercial property, sustainable development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Appshell>{children}</Appshell>
        </Providers>
      </body>
    </html>
  );
}
