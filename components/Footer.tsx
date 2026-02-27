"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Facebook, Instagram, Youtube, ArrowRight, ChevronDown } from "lucide-react";

const Footer = () => {
  // Simple Scroll Reveal Variant
  const scrollReveal: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  return (
    <footer className="bg-[#6B1218] text-white font-sans relative overflow-hidden">
      {/* Top Section: Newsletter with Scroll Reveal */}
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={scrollReveal}
        className="max-w-7xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-center md:text-left leading-tight">
          Get Updates On Fresh Saree Drops & Offers.
        </h2>
        
        <div className="w-full md:w-auto">
          <div className="bg-white rounded-full flex items-center p-1 w-full md:w-[450px]">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-5 py-3 bg-transparent text-gray-800 outline-none text-sm" 
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-6 py-3 rounded-full text-[10px] md:text-xs tracking-widest font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">SUBSCRIBE</span>
              <span className="sm:hidden">JOIN</span>
              <ArrowRight size={14} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <hr className="border-white/10" />

      {/* Middle Section: Links & Info with Staggered Reveal */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
      >
        
        {/* Support Column */}
        <motion.div variants={scrollReveal} className="space-y-6">
          <h3 className="text-sm font-bold tracking-widest uppercase">Support</h3>
          <div className="space-y-2 text-sm text-gray-100 font-light">
            <p>Call/WhatsApp: +91 9080389223</p>
            <p>Email: support@ihsanweaves.com</p>
          </div>
          <div className="space-y-1 text-sm text-gray-100 font-light pt-2">
            <p className="underline underline-offset-4 decoration-white/30">Customer Care:</p>
            <p>10 AM – 7 PM (Every Day)</p>
          </div>
          
          <div className="flex items-center gap-4 pt-4">
            {[Facebook, Instagram, Youtube].map((Icon, idx) => (
              <motion.a 
                key={idx}
                href="#" 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black p-2.5 rounded-full transition-colors hover:bg-gray-800"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links Column */}
        <motion.div variants={scrollReveal} className="space-y-6">
          <h3 className="text-sm font-bold tracking-widest uppercase">Quick Links</h3>
          <ul className="space-y-4 text-sm text-gray-100 font-light">
            {['Blogs', 'Frequently Asked Questions', 'My Account', 'My Orders'].map((item) => (
              <li key={item}>
                <motion.div whileHover={{ x: 5 }} whileTap={{ x: 3 }}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Policies Column */}
        <motion.div variants={scrollReveal} className="space-y-6">
          <h3 className="text-sm font-bold tracking-widest uppercase">Policies</h3>
          <ul className="space-y-4 text-sm text-gray-100 font-light">
            {['Shipping Policy', 'Cancellation Policy', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
              <li key={item}>
                <motion.div whileHover={{ x: 5 }} whileTap={{ x: 3 }}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </motion.div>

      </motion.div>

      <hr className="border-white/10" />

      {/* Bottom Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-3 py-1.5 rounded flex items-center gap-2 text-sm font-medium"
        >
          <span className="text-lg">🇮🇳</span> 
          INR
          <ChevronDown size={14} className="text-gray-500" />
        </motion.button>
        
        <p className="text-sm text-gray-300 font-light text-center">
          © 2026 Ihsan Weaves. All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;