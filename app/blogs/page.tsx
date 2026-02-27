"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";

// --- MOCK BLOG DATA ---
const blogPosts = [
  {
    id: 1,
    title: "The Timeless Elegance of Banarasi Silk: A Deep Dive",
    excerpt: "Discover the rich history, intricate weaving techniques, and the cultural significance of Banarasi silk sarees in modern Indian weddings.",
    category: "Heritage",
    date: "Feb 24, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Top 5 Bridal Lehenga Trends for the 2026 Season",
    excerpt: "From pastel hues to vintage velvet, explore the top trends that are taking the bridal fashion world by storm this year.",
    category: "Bridal",
    date: "Feb 18, 2026",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "How to Style Your Everyday Cotton Kurti",
    excerpt: "Learn how to easily transition your comfortable cotton kurtis from a day at the office to an elegant evening out.",
    category: "Style Guide",
    date: "Feb 10, 2026",
    readTime: "3 min read",
    img: "/assets/image.png",
    featured: false,
  },
  {
    id: 4,
    title: "Understanding Handloom: The Art of Slow Fashion",
    excerpt: "Why choosing handloom is not just a fashion statement, but a commitment to sustainability and supporting local artisans.",
    category: "Sustainability",
    date: "Jan 28, 2026",
    readTime: "6 min read",
    img: "/assets/hand.webp",
    featured: false,
  },
  {
    id: 5,
    title: "The Anatomy of a Perfect Anarkali Suit",
    excerpt: "Breaking down the silhouette, embroidery, and fabric choices that make the Anarkali a staple in every festive wardrobe.",
    category: "Fashion Education",
    date: "Jan 15, 2026",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=800&auto=format&fit=crop",
    featured: false,
  }
];

// --- CLEAN ANIMATION VARIANTS ---
const simpleReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" // TypeScript now knows this matches the Easing type
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const standardPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="bg-[#FAF8F5] min-h-screen font-sans pb-24 overflow-x-hidden">
      
      {/* --- PAGE HEADER --- */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={simpleReveal}
        className="py-16 md:py-24 text-center bg-white border-b border-gray-200"
      >
        <span className="text-[#7B1113] text-sm font-bold tracking-widest uppercase mb-4 block">
          Journal
        </span>
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 px-4">
          Threads & Tales
        </h1>
        <p className="text-gray-500 font-light text-base md:text-lg max-w-2xl mx-auto px-4">
          Stories of heritage and style from the world of Ihsan Weaves.
        </p>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-12 md:mt-16">
        
        {/* --- FEATURED POST --- */}
        {featuredPost && (
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={simpleReveal}
            className="mb-16 md:mb-24"
          >
            <Link href={`/blogs/${featuredPost.id}`} className="block group">
              <motion.div 
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-4 md:p-6 lg:p-8"
              >
                <div className="w-full lg:w-[60%] relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-lg">
                  <Image 
                    src={featuredPost.img}
                    alt={featuredPost.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-[#7B1113]">
                    {featuredPost.category}
                  </div>
                </div>

                <div className="w-full lg:w-[40%] flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-light">
                    <span>{featuredPost.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 leading-tight group-hover:text-[#7B1113] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 font-light text-base mb-8 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[#7B1113] font-bold text-xs tracking-widest uppercase">
                    READ ARTICLE <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )}

        {/* --- GRID POSTS --- */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {standardPosts.map((post) => (
            <motion.div key={post.id} variants={simpleReveal} className="h-full">
              <Link href={`/blogs/${post.id}`} className="block h-full group">
                <motion.div
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden">
                    <Image 
                      src={post.img}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <span className="text-[#7B1113] text-[10px] font-bold tracking-widest uppercase mb-3">{post.category}</span>
                    <h3 className="text-xl font-serif text-gray-900 mb-3 leading-tight group-hover:text-[#7B1113] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 font-light text-sm line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-gray-900 font-bold text-[10px] tracking-widest uppercase">
                      READ MORE <ArrowRight size={14} className="transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* --- LOAD MORE --- */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={simpleReveal}
          className="mt-16 text-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-gray-900 text-gray-900 px-10 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all"
          >
            Load More Articles
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}