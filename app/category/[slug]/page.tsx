"use client";

import React, { useState, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Heart, ChevronDown, Plus, SlidersHorizontal } from "lucide-react";
import { useWishlist } from "../../../context/WishlistContext";
import { useCart } from '../../../context/CartContext';

// Inside component:

// --- EXPANDED MOCK DATABASE ---

const productDatabase: Record<string, any[]> = {
  "kurti": [
    { id: 1, name: "Indigo Cotton Kurti", price: 1500, type: "Cotton", img: "/assets/kurtiset.webp" },
    { id: 2, name: "Floral Jaipur Kurti", price: 2100, type: "Jaipur Print", img:"/assets/kurtiset.webp"},
    { id: 3, name: "Silk Blend Party Kurti", price: 3500, type: "Silk Blend", img: "/assets/kurtiset.webp" },
    { id: 4, name: "Mint Green A-Line Kurti", price: 1850, type: "Cotton", img: "/assets/kurtiset.webp" },
    { id: 5, name: "Mustard Embroidered Kurti", price: 2400, type: "Embroidery", img: "/assets/kurtiset.webp" },
    { id: 6, name: "Georgette Slit Kurti", price: 2900, type: "Georgette", img: "/assets/kurtiset.webp" },
  ],
  "lehengas": [
    { id: 7, name: "Crimson Bridal Lehenga", price: 15000, type: "Bridal", img: "/assets/lehangas.avif" },
    { id: 8, name: "Pastel Net Lehenga", price: 8500, type: "Net", img: "/assets/lehangas.avif" },
    { id: 9, name: "Banarasi Silk Lehenga", price: 12000, type: "Silk", img: "/assets/lehangas.avif" },
    { id: 10, name: "Velvet Zari Lehenga", price: 18500, type: "Velvet", img: "/assets/lehangas.avif" },
    { id: 11, name: "Floral Organza Lehenga", price: 7200, type: "Organza", img: "/assets/lehangas.avif" },
    { id: 12, name: "Mirror Work Lehenga", price: 10500, type: "Bridal", img: "/assets/lehangas.avif" },
  ],
  "churidars": [
    { id: 13, name: "Classic Green Churidar", price: 2800, type: "Cotton", img: "/assets/churid.webp" },
    { id: 14, name: "Embroidered Silk Churidar", price: 4200, type: "Silk Blend", img: "/assets/churid.webp" },
    { id: 15, name: "Maroon Handloom Churidar", price: 3100, type: "Handloom", img: "/assets/churid.webp" },
    { id: 16, name: "Yellow Festive Churidar", price: 3600, type: "Silk Blend", img: "/assets/churid.webp" },
    { id: 17, name: "White Chikan Churidar", price: 2500, type: "Cotton", img: "/assets/churid.webp" },
    { id: 18, name: "Blue Chiffon Churidar", price: 2950, type: "Chiffon", img: "/assets/churid.webp" },
  ],
  "anarkalis": [
    { id: 19, name: "Royal Blue Silk Anarkali", price: 6500, type: "Silk", img: "/assets/anarkal.webp" },
    { id: 20, name: "Peach Georgette Anarkali", price: 4800, type: "Georgette", img: "/assets/anarkal.webp" },
    { id: 21, name: "Emerald Floor Length Anarkali", price: 7200, type: "Silk", img: "/assets/anarkal.webp" },
    { id: 22, name: "White Chikankari Anarkali", price: 5500, type: "Cotton", img: "/assets/anarkal.webp" },
    { id: 23, name: "Black Zari Work Anarkali", price: 8100, type: "Designer", img: "/assets/anarkal.webp" },
    { id: 24, name: "Yellow Printed Anarkali", price: 3900, type: "Cotton", img: "/assets/anarkal.webp" },
  ],
  "ethnic-wear": [
    { id: 25, name: "Traditional Silk Saree", price: 8500, type: "Saree", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop"  },
    { id: 26, name: "Banarasi Woven Suit", price: 5400, type: "Suit Set", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop"  },
    { id: 27, name: "Festive Sharara Set", price: 6200, type: "Sharara", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop" },
    { id: 28, name: "Cotton Handloom Saree", price: 3200, type: "Saree", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop" },
    { id: 29, name: "Embroidered Gharara", price: 7800, type: "Gharara", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop" },
    { id: 30, name: "Zari Work Kurta Set", price: 4600, type: "Suit Set", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop" },
  ],
  "western": [
    { id: 31, name: "Beige Tailored Jumpsuit", price: 3500, type: "Jumpsuit", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600" },
    { id: 32, name: "Navy Blue Maxi Dress", price: 2800, type: "Dress", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600" },
    { id: 33, name: "Olive Wide Leg Trousers", price: 1900, type: "Trousers", img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600" },
    { id: 34, name: "White Tiered Dress", price: 2400, type: "Dress", img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=600" },
    { id: 35, name: "Black Formal Blazer", price: 4200, type: "Outerwear", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600" },
    { id: 36, name: "Floral Wrap Skirt", price: 1750, type: "Skirt", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600" },
  ],
  "designer": [
    { id: 37, name: "Asymmetric Tunic", price: 8500, type: "Tunic", img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600" },
    { id: 38, name: "Couture Drape Saree", price: 18000, type: "Saree", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600" },
    { id: 39, name: "Structured Cape Set", price: 14500, type: "Co-ord", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600" },
    { id: 40, name: "Metallic Pre-Stitched Gown", price: 21000, type: "Gown", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600" },
    { id: 41, name: "Hand-Painted Organza Shirt", price: 6200, type: "Top", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600" },
    { id: 42, name: "Embellished Corset Set", price: 11000, type: "Co-ord", img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=600" },
  ],
  "default": [
    { id: 43, name: "Elegant Handloom Piece", price: 3000, type: "Handloom", img: "/assets/hand.webp" },
    { id: 44, name: "Premium Casual Wear", price: 2500, type: "Casual", img: "/assets/eday.webp" },
    { id: 45, name: "Festive Collection Set", price: 6500, type: "Festive", img: "/assets/kurtiset.webp" },
    { id: 46, name: "Signature Drape", price: 5500, type: "Designer", img: "/assets/drape.webp" },
    { id: 47, name: "Everyday Essential", price: 1800, type: "Casual", img: "/assets/eday.webp" },
    { id: 48, name: "Luxury Silk Drape", price: 9200, type: "Silk", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600" },
  ]
};

// --- ANIMATION VARIANTS (Types Fixed) ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    }
  }
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 250, damping: 25 } 
  }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  
  const [isClient, setIsClient] = React.useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();



  React.useEffect(() => {
    setIsClient(true);
  }, []);
  const resolvedParams = use(params);
  const currentCategory = resolvedParams.slug;
  
  const pageTitle = currentCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  const categoryProducts = productDatabase[currentCategory] || productDatabase["default"];
  const availableTypes = Array.from(new Set(categoryProducts.map(p => p.type)));

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(product => {
      const withinPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      return withinPrice && matchesType;
    });
  }, [categoryProducts, minPrice, maxPrice, selectedTypes]);
  if (!isClient) {
    return <div className="min-h-screen bg-white" />; // Clean fallback
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen font-sans overflow-hidden">
      
      {/* Page Header - Animated Fade Down */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-12 text-center bg-white border-b border-gray-200 shadow-sm"
      >
        <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-2">{pageTitle}</h1>
        <div className="text-sm text-gray-500 tracking-wide">
          <Link href="/" className="hover:text-[#7B1113] transition-colors">Home</Link> / <span>{pageTitle}</span>
        </div>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-10">
        
        {/* Mobile Filter Toggle */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="md:hidden flex justify-between items-center bg-white p-4 border border-gray-200 cursor-pointer shadow-sm rounded-sm" 
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <span className="font-medium text-gray-800 flex items-center gap-2"><SlidersHorizontal size={18} /> Filters</span>
          <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileFilterOpen ? "rotate-180" : ""}`} />
        </motion.div>

        {/* --- LEFT SIDEBAR (FILTERS) --- */}
        <motion.aside 
          variants={slideInLeft}
          initial="hidden"
          animate="show"
          className={`${isMobileFilterOpen ? "block" : "hidden"} md:block w-full md:w-[280px] flex-shrink-0`}
        >
          <h2 className="text-2xl font-light text-gray-800 border-b border-gray-200 pb-4 mb-6 hidden md:block">
            Filter:
          </h2>

          <div className="mb-8 border-b border-gray-200 pb-8">
            <h3 className="text-[15px] font-medium text-gray-800 mb-6">Price</h3>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-1 relative group">
                <span className="text-gray-400 absolute left-3 text-sm">₹</span>
               <input 
  type="number" 
  value={minPrice}
  suppressHydrationWarning // Add this to stop extension-related crashes
  onChange={(e) => setMinPrice(Number(e.target.value))}
  className="w-full border border-gray-200 bg-[#FBFBFB] py-2 pl-7 pr-2 text-gray-600 text-sm outline-none focus:border-[#7B1113] focus:bg-white transition-all rounded-sm shadow-inner"
/>
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex items-center gap-2 flex-1 relative group">
                <span className="text-gray-400 absolute left-3 text-sm">₹</span>
                <input 
  type="number" 
  value={maxPrice}
  suppressHydrationWarning // <--- ADD THIS
  onChange={(e) => setMaxPrice(Number(e.target.value))}
  className="w-full border border-gray-200 bg-[#FBFBFB] py-2 pl-7 pr-2 text-gray-600 text-sm outline-none focus:border-[#7B1113] focus:bg-white transition-all rounded-sm shadow-inner"
/>
              </div>
            </div>
          </div>

          <div className="mb-8 border-b border-gray-200 pb-8">
            <h3 className="text-[15px] font-medium text-gray-800 mb-6">Product type</h3>
            <ul className="space-y-4">
              {availableTypes.map((type, i) => (
                <motion.li 
                  key={i}
                  whileHover={{ x: 5 }} 
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeToggle(type)}
                        className="peer appearance-none w-5 h-5 border border-gray-300 rounded-sm bg-white checked:bg-[#7B1113] checked:border-[#7B1113] transition-all cursor-pointer shadow-sm group-hover:border-[#7B1113]"
                      />
                      <motion.svg 
                        initial={{ scale: 0 }}
                        animate={{ scale: selectedTypes.includes(type) ? 1 : 0 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="absolute w-3 h-3 text-white pointer-events-none" 
                        viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    </div>
                    <span className="text-gray-600 text-sm font-light group-hover:text-[#7B1113] transition-colors uppercase tracking-wide">
                      {type}
                    </span>
                  </label>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.aside>

        {/* --- RIGHT SIDEBAR (PRODUCT GRID) --- */}
        <main className="flex-1">
          {/* Toolbar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between items-center mb-8 text-sm text-gray-500"
          >
            <span>Showing {filteredProducts.length} results</span>
            <div className="flex items-center gap-2">
              <label>Sort by:</label>
              <select className="bg-transparent border-none outline-none font-medium text-gray-800 cursor-pointer hover:text-[#7B1113] transition-colors">
                <option>Featured</option>
                <option>Price, low to high</option>
                <option>Price, high to low</option>
              </select>
            </div>
          </motion.div>

          {/* Grid with Staggered Scroll Reveal */}
          {filteredProducts.length > 0 ? (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12"
            >
              {filteredProducts.map((product) => (
                <motion.div 
                  variants={fadeUpItem} 
                  key={product.id}
                  className="group cursor-pointer flex flex-col h-full"
                >
                  <Link href={`/product/${product.id}`} className="block w-full h-full">
                    
                    {/* Advanced Spring Hover on the Card */}
                    <motion.div 
                      whileHover={{ y: -8, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 mb-4 rounded-sm border border-transparent group-hover:border-gray-100"
                    >
                      <Image 
                        src={product.img} 
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                      />
                      
                      {/* Floating Heart Icon */}
                      <button 
                        suppressHydrationWarning
                        onClick={(e) => {
  e.preventDefault();   // Prevents navigation
  e.stopPropagation();  // Prevents the Link component from seeing the click
  if (isInWishlist(product.id)) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img
    });
  }
}}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:scale-110 hover:bg-white transition-all duration-300 z-10"
                      >
                        <Heart 
                          size={16} 
                          className={`transition-colors duration-300 ${
                            isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                          }`} 
                        />
                      </button>

                      {/* Quickshop Button - Slide Up & Glow */}
                     <div className="absolute bottom-4 left-4 right-4 translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] z-10">
  <motion.button 
    whileTap={{ scale: 0.95 }}
    onClick={(e) => {
      e.preventDefault(); // Prevents navigating to the product page
      e.stopPropagation(); // Prevents parent Link triggers
      addToCart(product);  // Adds the current product to your CartContext
    }}
    className="w-full bg-white text-gray-900 py-2.5 md:py-3 rounded-full text-[10px] md:text-[11px] font-bold tracking-widest uppercase shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2 hover:bg-[#7B1113] hover:text-white transition-colors duration-300"
  >
    <Plus size={14} /> QUICKSHOP
  </motion.button>
</div>
                      
                      {/* Subtle Dark Overlay for contrast */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                    </motion.div>

                    {/* Product Info */}
                    <div className="text-center px-1">
                      <h3 className="text-[#333333] text-sm md:text-base font-medium mb-1 group-hover:text-[#7B1113] transition-colors truncate">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-[15px] font-light">
                        ₹ {product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 text-gray-500"
            >
              <h3 className="text-xl mb-2 font-serif text-gray-800">No products found</h3>
              <p className="font-light">Try adjusting your price or type filters.</p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}