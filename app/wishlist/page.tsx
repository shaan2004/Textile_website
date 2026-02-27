"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 1. Import useRouter
import { motion, Variants } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowLeft, Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext'; // 2. Import useCart

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Items appear one after another
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 260, damping: 20 } 
  }
};

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart(); // 3. Initialize Cart Hook
  const router = useRouter();     // 4. Initialize Router

  const handleMoveToCart = (item: any) => {
    addToCart(item);             // Add to bag
    removeFromWishlist(item.id);  // Remove from saved list
    router.push('/cart');        // Navigate to cart page
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header - Simple Fade Down */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-[#4A2511] mb-3">My Wishlist</h1>
          <div className="h-1 w-20 bg-[#7B1113] mb-4"></div>
          <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-bold">
            {wishlist.length} Items Saved
          </p>
        </motion.div>

        {wishlist.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {wishlist.map((item) => (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -10 }} // Lift effect on hover
                className="bg-white group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100 flex flex-col h-full"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                  <Image 
                    src={item.img} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                  />
                  
                  {/* Remove Button */}
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-gray-400 hover:text-red-600 transition-colors shadow-sm z-10"
                  >
                    <Trash2 size={18} />
                  </motion.button>

                  {/* Overlay for depth */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
                </div>

                {/* Content Area */}
                <div className="p-6 text-center flex flex-col flex-grow">
                  <h3 className="text-sm font-bold text-[#4A2511] uppercase tracking-wider mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-[#7B1113] font-bold text-lg mb-6">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>
                  
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMoveToCart(item)}
                    className="mt-auto w-full border-2 border-[#4A2511] py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#4A2511] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State - Animated Heart Reveal */
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-white rounded-[3rem] shadow-inner border-2 border-dashed border-gray-100 max-w-2xl mx-auto"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="mx-auto text-gray-100 mb-6 fill-gray-50" size={80} />
            </motion.div>
            <h2 className="text-2xl font-serif text-gray-400 mb-8">Your wishlist is currently empty</h2>
            <Link href="/" className="inline-flex items-center gap-3 bg-[#7B1113] text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-black hover:shadow-2xl transition-all duration-300">
              <ArrowLeft size={16} /> Start Exploring
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}