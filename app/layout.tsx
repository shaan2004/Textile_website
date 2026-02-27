import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WishlistProvider } from "../context/WishlistContext";
import { CartProvider } from "../context/CartContext"; // Import the Cart Provider
import WhatsAppButton from "@/components/WhatsAppButton"; // Import here
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
  const announcement = "FREE SHIPPING OVER ₹5,000 IN INDIA | WORLDWIDE SHIPPING AVAILABLE";

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased flex flex-col min-h-screen bg-white text-gray-900 font-sans`}
      >
        <CartProvider>
          <WishlistProvider>
            {/* Continuous Scrolling Announcement Bar */}
            <div className="bg-[#4A2511] text-[#F5EFE6] text-xs py-2 overflow-hidden whitespace-nowrap border-b border-white/10">
              <div className="flex animate-marquee">
                <span className="px-4 tracking-widest">{announcement}</span>
                <span className="px-4 tracking-widest">{announcement}</span>
                <span className="px-4 tracking-widest">{announcement}</span>
                <span className="px-4 tracking-widest">{announcement}</span>
              </div>
            </div>

            {/* Global Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-grow">
              {children}
            </main>
            <WhatsAppButton />

            {/* Global Footer */}
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}