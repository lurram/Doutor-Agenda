import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/provides/react-query";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Doutor Agenda",
  description: "Website para gerenciar uma clinica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <ReactQueryProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </ReactQueryProvider>
        <Toaster position="bottom-center" richColors theme="light" />
      </body>
    </html>
  );
}
