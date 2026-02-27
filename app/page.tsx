"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Instagram } from "lucide-react"; // Imported Instagram icon

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- Data Arrays ---

  const banners = [
    {
      id: 1,
      src: "/assets/banner1.png", 
      alt: "The Festive Edit",
      title: "The Festive Edit",
      subtitle: "Exquisite Kurtis, Anarkalis, and Lehengas crafted for the modern woman."
    },
    {
      id: 2,
      src: "/assets/banner2.png",
      alt: "Bridal Collection",
      title: "Bridal Elegance",
      subtitle: "Make a statement on your special day with our regal lehengas."
    },
    {
      id: 3,
      src: "/assets/banner3.png",
      alt: "Everyday Classics",
      title: "Everyday Classics",
      subtitle: "Comfort meets style in our premium churidar collections."
    }
  ];

  const categories = [
    { name: "Designer Kurtis", desc: "Everyday elegance and comfort for the modern woman.", img: "/assets/kurtiset.webp" }, 
    { name: "Classic Churidars", desc: "Timeless grace and perfectly tailored fits.", img: "/assets/churidar.webp" },
    { name: "Regal Anarkalis", desc: "Flowing silhouettes with intricate embroidery.", img: "/assets/anarkal.webp" },
    { name: "Festive Lehengas", desc: "Make a statement at your next wedding or celebration.", img: "/assets/lehangas.avif" },
  ];

  // Mock Instagram Feed Images
  const instaFeed = [
    { id: 1, img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop" },
    { id: 2, img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop" },
    { id: 3, img: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=600&auto=format&fit=crop" },
    { id: 4, img: "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=600&auto=format&fit=crop" },
  { id: 5, img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop" }, // Fixed 5th image
  ];
  const gridClasses = [
    "md:col-span-2 md:row-span-2 h-[350px] md:h-full", 
    "md:col-span-2 md:row-span-1 h-[250px] md:h-[350px]", 
    "md:col-span-1 md:row-span-1 h-[250px] md:h-[350px]", 
    "md:col-span-1 md:row-span-1 h-[250px] md:h-[350px]"  
  ];

  const faqs = [
    {
      question: "How do I register?",
      answer: "You can register by simply setting up an email address and a password. Sign in to view what is already in your shopping cart. You can also opt to sign in using social media log in."
    },
    {
      question: "Can I ship different items in my order to different shipping addresses?",
      answer: "We can only process one shipping address per order. So, if you would like to order several items and ship to different people, please treat these as separate orders."
    },
    {
      question: "Can my order be gift wrapped with gift messages?",
      answer: "Absolutely! Please leave us additional instructions for gift wrapping and requisite messages at checkout, and we will ensure your Anarkali or Lehenga is beautifully packaged."
    },
    {
      question: "In case the delivery destination is outside India, will I be charged duties / levies?",
      answer: "Please refer to the Duties and Taxes section under Delivery and Shipping for more information on international taxes and customs duties specific to your country."
    },
    {
      question: "Is it safe to use my credit card online at Ihsan Weaves?",
      answer: "We do not store credit card information on our website. Your credit card information is 100% safe with our encrypted, industry-standard payment solution providers."
    }
  ];

  // --- Handlers & Effects ---

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  // --- Animation Variants ---
  
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-white relative overflow-hidden">
      
      {/* Full-Width Hero Banner Slider */}
      <section className="relative w-full h-[60vh] md:h-[85vh] bg-gray-900 overflow-hidden group">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={banners[currentSlide].src} 
              alt={banners[currentSlide].alt}
              fill
              priority={currentSlide === 0}
              className="object-cover object-top opacity-80" 
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center justify-center md:justify-end px-4 md:px-24 pointer-events-none">
          <div className="text-center md:text-right max-w-lg pointer-events-auto bg-black/20 md:bg-transparent p-6 rounded-xl md:p-0 md:rounded-none backdrop-blur-sm md:backdrop-blur-none">
            <h2 className="text-3xl md:text-6xl font-serif text-white mb-2 md:mb-4 drop-shadow-md leading-tight">
              {banners[currentSlide].title}
            </h2>
            <p className="text-sm md:text-xl text-white mb-6 md:mb-8 drop-shadow-sm font-light">
              {banners[currentSlide].subtitle}
            </p>
            <Link href="/collections/all">
              <button className="border border-white text-white px-6 md:px-8 py-2 md:py-3 text-xs md:text-sm tracking-widest hover:bg-white hover:text-black transition-colors rounded-full font-medium">
                SHOP NOW
              </button>
            </Link>
          </div>
        </div>

        <button 
          onClick={prevSlide}
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={nextSlide}
          className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          aria-label="Next slide"
        >
          <ChevronRight size={32} />
        </button>

        <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center gap-2 md:gap-3 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-6 md:w-8 bg-white' : 'w-2 md:w-2.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* --- UNIFIED SHOP BY CATEGORY SECTION --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="py-12 md:py-24 px-4 md:px-8 max-w-[1400px] mx-auto"
      >
        <div className="text-center mb-10 md:mb-16">
          <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2 md:mb-4">Shop by Category</h3>
          <p className="text-sm md:text-lg text-gray-500 font-light">Elevate your wardrobe with our premium ethnic collections.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 mb-3 md:mb-4">
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`${gridClasses[index]} relative group overflow-hidden cursor-pointer rounded-sm`}
            >
              <Link href={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`} className="block w-full h-full">
                <Image 
                  src={cat.img}
                  alt={cat.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 md:opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 p-5 md:p-8 w-full flex flex-col justify-end text-white">
                  <h4 className="text-xl md:text-3xl font-serif tracking-wide drop-shadow-md">
                    {cat.name}
                  </h4>
                  
                  <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="mt-2 md:mt-3 text-xs md:text-base text-gray-200 font-light max-w-sm drop-shadow line-clamp-2 md:line-clamp-none">
                        {cat.desc}
                      </p>
                      <div className="mt-3 md:mt-5 hidden md:block">
                        <span className="inline-block border border-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                          BUY NOW
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 h-auto md:h-[600px]">
          
          <Link href="/category/ethnic-wear" className="relative group block h-[350px] md:h-full overflow-hidden rounded-sm">
            <Image 
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop" 
              alt="Ethnic Wear" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 md:opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute bottom-0 left-0 p-5 md:p-8 w-full flex flex-col justify-end text-white">
              <h4 className="text-2xl md:text-4xl font-serif tracking-wide drop-shadow-md mb-1 md:mb-2">
                Ethnic Wear
              </h4>
              
              <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                <div className="overflow-hidden">
                  <p className="mt-2 md:mt-3 text-xs md:text-base text-gray-200 font-light max-w-sm drop-shadow mb-3 md:mb-4 line-clamp-2 md:line-clamp-none">
                    An exclusive line of traditional ready-to-wear pieces for festive occasions.
                  </p>
                  <div className="mt-2 hidden md:block">
                    <span className="inline-block border border-[#d4af37] text-[#d4af37] px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-colors">
                      BUY NOW
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-3 md:gap-4 h-auto md:h-full">
            <Link href="/category/designers" className="relative group block flex-1 h-[250px] md:h-auto overflow-hidden rounded-sm">
              <Image 
                src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop" 
                alt="Designers" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 md:opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-5 md:p-8 w-full flex flex-col justify-end text-white">
                <h4 className="text-xl md:text-3xl font-serif tracking-wide drop-shadow-md">
                  Designers
                </h4>
                
                <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                  <div className="overflow-hidden">
                    <p className="mt-2 md:mt-3 text-xs md:text-base text-gray-200 font-light max-w-sm drop-shadow line-clamp-2 md:line-clamp-none">
                      Exclusive collections curated from top fashion artisans.
                    </p>
                    <div className="mt-3 md:mt-5 hidden md:block">
                      <span className="inline-block border border-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                        BUY NOW
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/category/western" className="relative group block flex-1 h-[250px] md:h-auto overflow-hidden rounded-sm">
              <Image 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
                alt="Western" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 md:opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-5 md:p-8 w-full flex flex-col justify-end text-white">
                <h4 className="text-xl md:text-3xl font-serif tracking-wide drop-shadow-md">
                  Western
                </h4>
                
                <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                  <div className="overflow-hidden">
                    <p className="mt-2 md:mt-3 text-xs md:text-base text-gray-200 font-light max-w-sm drop-shadow line-clamp-2 md:line-clamp-none">
                      Contemporary silhouettes for the modern, everyday wardrobe.
                    </p>
                    <div className="mt-3 md:mt-5 hidden md:block">
                      <span className="inline-block border border-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                        BUY NOW
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </motion.section>

      {/* --- NEW: INSTAGRAM FEED SECTION --- */}
       {/* --- SCROLLABLE INSTAGRAM REELS SECTION --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="py-12 md:py-20 bg-[#FAF8F5] overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto">
          
          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-10 md:mb-12 px-4 md:px-8">
            <Instagram size={32} className="text-[#7B1113] mb-4" />
            <h3 className="text-2xl md:text-4xl font-serif text-gray-900 mb-2">Shop Our Instagram</h3>
            <p className="text-gray-500 font-light text-sm md:text-base mb-6">@IhsanWeaves_Official</p>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-gray-900 text-gray-900 px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors"
            >
              Follow Us
            </a>
          </div>

          {/* Horizontal Scrollable Reels Container */}
          {/* Note: pl-4 md:pl-8 ensures the first image aligns with your page margin, while letting the right side bleed off the screen */}
          <div className="w-full pl-4 md:pl-8">
            <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {instaFeed.map((post, index) => (
                <motion.a 
                  key={post.id}
                  href="https://instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  /* Taller height for Reels feel, fixed width for horizontal scrolling */
                  className="relative w-[240px] md:w-[320px] h-[420px] md:h-[550px] flex-shrink-0 overflow-hidden group block cursor-pointer snap-center rounded-md bg-gray-100"
                >
                  <Image 
                    src={post.img} 
                    alt="Instagram Reel" 
                    fill
                    sizes="(max-width: 768px) 240px, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  
                  {/* Hover Overlay with Icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Instagram size={40} className="text-white transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
          
        </div>
      </motion.section>

      {/* Heritage Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="py-10 md:py-16 px-4 md:px-8 max-w-[1400px] mx-auto"
      >
        <div className="flex flex-col md:flex-row w-full bg-white border border-gray-100 shadow-sm overflow-hidden min-h-[400px] md:min-h-[500px] rounded-lg">
          
          <div className="w-full md:w-1/3 bg-[#FDF5F5] flex flex-col items-center justify-center p-8 md:p-12 text-center border-b md:border-b-0 md:border-r border-gray-200">
            <h3 className="text-[#7B1113] font-serif text-base md:text-xl italic mb-3 md:mb-4 leading-relaxed">
              Decades of<br />Handcrafted<br />Ethnic Heritage
            </h3>
            <div className="text-2xl md:text-4xl font-serif font-bold text-[#7B1113] mb-4 md:mb-6 tracking-widest uppercase leading-none">
              IHSAN<br />WEAVES
            </div>
            <p className="text-[#7B1113] text-xs md:text-base font-medium tracking-wide">
              Chennai | Bengaluru | Coimbatore | Mumbai
            </p>
          </div>

          <div className="w-full md:w-1/3 p-8 md:p-14 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-serif text-gray-900 mb-4 md:mb-6 leading-tight">
              100 Years of Heritage
            </h2>
            <p className="text-gray-600 font-light leading-relaxed mb-6 md:mb-8 text-xs md:text-base">
              Founded on the principles of impeccable craftsmanship, Ihsan Weaves brings you ethnic wear that celebrates tradition with a contemporary flair. From perfectly cut Churidars to majestic bridal Lehengas, our artisans pour their heart into every stitch.
            </p>
            <div>
              <Link href="/about-us">
                <button className="bg-[#7B1113] text-white px-6 md:px-8 py-2 md:py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors">
                  READ MORE
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/3 relative min-h-[250px] md:min-h-auto">
            <Image 
              src="/assets/heritage.png" 
              alt="Heritage Tailoring" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="py-16 md:py-24 px-4 md:px-12 max-w-4xl md:max-w-6xl mx-auto"
      >
        <div className="text-center mb-10 md:mb-16">
          <h3 className="text-3xl md:text-5xl font-serif text-gray-900">Frequently asked questions</h3>
        </div>
        
        <div className="space-y-1 md:space-y-2 border-t border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;

            return (
              <div key={index} className="border-b border-gray-200">
                <button 
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full py-5 md:py-8 flex items-center justify-between text-left group outline-none"
                >
                  <span className="text-base md:text-2xl text-gray-800 group-hover:text-[#7B1113] transition-colors pr-4 md:pr-8 font-medium md:font-normal">
                    {faq.question}
                  </span>
                  <motion.div 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown strokeWidth={1.5} className="w-5 h-5 md:w-8 md:h-8 text-gray-500 group-hover:text-[#7B1113] transition-colors" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 md:pb-8 text-sm md:text-lg text-gray-600 font-light leading-relaxed pr-4 md:pr-16">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

     
    </div>
  );
}