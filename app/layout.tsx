import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WishlistProvider } from "../context/WishlistContext"; // Import the Provider

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ihsan Weaves | Premium Handloom Silks & Sarees",
  description: "Discover our exquisite collection of handwoven pure silk, cotton sarees, and curated bridesmaid collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased flex flex-col min-h-screen bg-white text-gray-900 font-sans`}
      >
        <WishlistProvider> {/* Wrap everything here */}
          {/* Global Announcement Bar */}
          <div className="bg-[#4A2511] text-[#F5EFE6] text-xs py-2 text-center tracking-widest">
            FREE SHIPPING OVER ₹5,000 IN INDIA | WORLDWIDE SHIPPING AVAILABLE
          </div>

          {/* Global Navbar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Global Footer */}
          <Footer />
        </WishlistProvider>
      </body>
    </html>
  );
}