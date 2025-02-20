import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({ subsets: ["latin"] })
export const metadata = {
  title: "Wealth",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ClerkProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster />
          <Footer />
        </ClerkProvider>

      </body>
    </html >
  );
}
