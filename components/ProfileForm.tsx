"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User } from "lucide-react";

interface ProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileForm = ({ isOpen, onClose }: ProfileFormProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Form Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#7B1113] p-8 text-white text-center relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 hover:rotate-90 transition-transform duration-300"
              >
                <X size={24} />
              </button>
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <User size={32} />
              </div>
              <h2 className="font-serif text-3xl tracking-wide">Join Ihsan Weaves</h2>
              <p className="text-white/70 text-xs mt-2 tracking-widest uppercase font-light">Create your personal style profile</p>
            </div>

            {/* Form */}
            <form className="p-8 md:p-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block ml-1">Full Name</label>
                <div className="flex items-center gap-3 border-b border-gray-100 focus-within:border-[#7B1113] py-2 transition-all">
                   <User size={16} className="text-gray-300" />
                   <input 
                    type="text" 
                    suppressHydrationWarning
                    className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-300" 
                    placeholder="Enter your full name" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block ml-1">Email Address</label>
                <div className="flex items-center gap-3 border-b border-gray-100 focus-within:border-[#7B1113] py-2 transition-all">
                  <Mail size={16} className="text-gray-300" />
                  <input 
                    type="email" 
                    suppressHydrationWarning
                    className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-300" 
                    placeholder="example@ihsanweaves.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block ml-1">Secret Password</label>
                <div className="flex items-center gap-3 border-b border-gray-100 focus-within:border-[#7B1113] py-2 transition-all">
                  <Lock size={16} className="text-gray-300" />
                  <input 
                    type="password" 
                    suppressHydrationWarning
                    className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-300" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>

              <div className="pt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#7B1113] text-white py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs shadow-xl shadow-[#7B1113]/20 hover:bg-black transition-colors"
                >
                  Create Account
                </motion.button>
              </div>

              <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest pt-4">
                Already part of the family? <span className="text-[#7B1113] cursor-pointer font-black border-b border-[#7B1113]">Login Here</span>
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfileForm;