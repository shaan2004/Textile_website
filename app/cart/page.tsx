"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-serif text-[#4A2511] mb-10 text-center">Your Shopping Bag</h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Product List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <motion.div layout key={item.id} className="bg-white p-6 rounded-2xl flex gap-6 shadow-sm border border-gray-100">
                  <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image src={item.img} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-[#4A2511] uppercase text-sm tracking-widest">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-[#7B1113] font-bold mb-4">₹ {item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-200 rounded-full px-4 py-1 gap-4">
                        <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                        <span className="font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Summary */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-fit sticky top-24">
              <h2 className="text-xl font-serif mb-6 border-b pb-4">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹ {cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="text-green-600 uppercase text-xs font-bold">Free</span></div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t"><span>Total</span><span>₹ {cartTotal.toLocaleString()}</span></div>
              </div>
              <button className="w-full bg-[#7B1113] text-white py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs hover:bg-black transition-all flex items-center justify-center gap-2">
                Checkout <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-serif text-gray-400 mb-6">Your bag is empty</h2>
            <Link href="/" className="bg-[#7B1113] text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}