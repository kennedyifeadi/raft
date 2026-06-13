"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "I was able to reduce the time taken to present high-level designs by 35% using the platform.",
    author: "Sara Bright",
    role: "Freelance Designer",
  },
  {
    quote: "This tool has completely revolutionized how I manage attendance for my coding bootcamp students.",
    author: "James Peterson",
    role: "Coding Bootcamp Tutor",
  },
  {
    quote: "As a university lecturer, keeping track of hundreds of students used to be a nightmare until we switched to this.",
    author: "Dr. Emily Chen",
    role: "University Lecturer",
  },
  {
    quote: "The seamless integration and intuitive UI make facial recognition attendance a breeze for everyone.",
    author: "Marcus Johnson",
    role: "System Administrator",
  },
];

export default function AuthTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-full rounded-[15px] text-white overflow-hidden p-12 flex flex-col justify-end">
      {/* Background Image */}
      <img
        src="/AuthBG.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Subtle scrim so white text stays readable */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <div className="relative z-10 w-[90%]">
        <div className="flex gap-4 mb-6">
          <span className="px-4 py-1 text-sm rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
            Community of users
          </span>
          <span className="px-4 py-1 text-sm rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
            Easy attendance
          </span>
        </div>

        <div className="h-48 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col justify-between"
            >
              <p className="text-3xl font-medium leading-tight">
                "{testimonials[currentIndex].quote}"
              </p>
              <div className="mb-8">
                <p className="font-semibold text-lg">{testimonials[currentIndex].author}</p>
                <p className="text-blue-100 text-sm">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Right Cutout with Arrows */}
      <div className="absolute bottom-0 right-0">
        {/* Curved cutout effect container */}
        <div className="relative bg-white pt-6 pl-6 rounded-tl-[20px]">
          
          {/* Left intersection curve */}
          <div className="absolute bottom-0 left-[-20px] w-[20px] h-[20px] overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-[40px] h-[40px] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_20px_white]" />
          </div>

          {/* Top intersection curve */}
          <div className="absolute top-[-20px] right-0 w-[20px] h-[20px] overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-[40px] h-[40px] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_20px_white]" />
          </div>

          {/* Buttons container */}
          <div className="flex gap-2 p-2">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors text-black"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors text-black"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
