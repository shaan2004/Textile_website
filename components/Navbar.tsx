"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Heart, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';
import ProfileForm from './ProfileForm'; // Importing the separate component

interface NavLink {
  name: string;
  hasDropdown: boolean;
  href: string; 
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const navLinks: NavLink[] = [
    { name: 'JUST ARRIVED', hasDropdown: false, href: '/category/just-arrived' },
    { name: 'KURTI', hasDropdown: true, href: '/category/kurti' },
    { name: 'LEHENGAS', hasDropdown: true, href: '/category/lehengas' },
    { name: 'ETHNIC WEAR', hasDropdown: true, href: '/category/ethnic-wear' },
    { name: 'ANARKALIS', hasDropdown: true, href: '/category/anarkalis' },
    { name: 'CHURIDARS', hasDropdown: false, href: '/category/churidars' },
    { name: 'WESTERN', hasDropdown: true, href: '/category/western' },
    { name: 'DESIGNER', hasDropdown: false, href: '/category/designer' },
    { name: 'DRESS MATERIALS', hasDropdown: true, href: '/category/dress-materials' },
    { name: 'BLOGS', hasDropdown: false, href: '/blogs' },
  ];

  if (!isClient) return null;

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full relative z-40 shadow-sm"
      >
        {/* Top Red Bar */}
        <div className="bg-[#7B1113] text-white px-4 md:px-8 py-2 md:py-4 flex items-center justify-between">
          
          {/* Left: Mobile Hamburger & Search */}
          <div className="flex items-center gap-4 flex-1">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-1"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </motion.button>
            
            <motion.div 
              whileHover={{ opacity: 0.7 }}
              className="flex items-center gap-2 cursor-pointer transition-opacity"
            >
              <Search size={20} />
              <span className="hidden md:inline-block text-xs font-bold tracking-widest">SEARCH</span>
            </motion.div>
          </div>

          {/* Center: Logo and Title */}
          <Link href="/" className="flex flex-col items-center justify-center flex-shrink-0 group">
            <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="h-8 w-8 md:h-12 md:w-12 mb-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="50" cy="50" r="45" />
                <path d="M50 5 L50 95 M5 50 L95 50 M20 20 L80 80 M80 20 L20 80" />
              </svg>
            </motion.div>
            <h1 className="text-lg md:text-3xl font-serif font-bold tracking-[0.2em] whitespace-nowrap leading-none transition-colors group-hover:text-gray-200">
              IHSAN WEAVES
            </h1>
            <span className="text-[8px] md:text-[10px] tracking-[0.4em] font-light mt-1 opacity-80 uppercase">
              Tradition Reimagined
            </span>
          </Link>

          {/* Right: User Icons */}
          <div className="flex items-center justify-end gap-4 md:gap-8 flex-1">
            {/* PROFILE ICON TRIGGER */}
            <motion.button 
              suppressHydrationWarning
              onClick={() => setIsProfileOpen(true)}
              whileHover={{ y: -2 }} 
              whileTap={{ y: 0 }}
            >
              <User size={22} />
            </motion.button>

            {/* WISHLIST LINK */}
            <Link href="/wishlist" className="relative">
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}><Heart size={22} /></motion.div>
              <span className="absolute -top-2 -right-2 bg-white text-[#7B1113] text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-sm">0</span>
            </Link>

            <Link href="/cart" className="relative flex items-center gap-1">
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}><ShoppingBag size={22} /></motion.div>
              <span className="text-xs font-bold hidden md:inline-block tracking-tighter">(0)</span>
            </Link>
          </div>
        </div>

        {/* Bottom Beige Bar (Desktop) */}
        <div className="hidden md:block bg-[#F5EFE6] text-[#4A2511] px-4 py-3 border-b border-gray-200">
          <ul className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-bold tracking-[0.15em]">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link href={link.href} className="flex items-center gap-1 py-1 transition-colors hover:text-[#7B1113]">
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={12} className="opacity-50" />}
                </Link>
                <motion.div 
                  className="absolute bottom-0 left-0 h-[1.5px] bg-[#7B1113] w-0 group-hover:w-full transition-all duration-300"
                />
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Profile Form Modal Overlay */}
      <ProfileForm isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* --- MOBILE SLIDE-OUT MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm"
            />

            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-[#F5EFE6] z-[60] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 bg-[#7B1113] text-white">
                <span className="font-serif font-bold text-xl tracking-widest uppercase">Explore</span>
                <motion.button whileTap={{ rotate: 90 }} onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={28} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-6">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, idx) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-gray-200 last:border-none"
                    >
                      <Link
                        href={link.href}
                        className="flex items-center justify-between py-5 text-[#4A2511] font-bold text-xs tracking-widest uppercase active:bg-white/50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)} 
                      >
                        {link.name}
                        {link.hasDropdown && <ChevronDown size={14} className="opacity-40" />}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="p-8 border-t border-gray-200 bg-white">
                <button 
                  suppressHydrationWarning
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsProfileOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-[#7B1113] text-white py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-md"
                >
                  <User size={18} />
                  My Account / Login
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;