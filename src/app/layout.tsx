import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthContext from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Art Hub",
  description: "Art Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-200 text-stone-900 dark:bg-stone-900 dark:text-white font-light`}
      >
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
