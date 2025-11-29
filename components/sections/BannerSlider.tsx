"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";



const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export default function BannerSlider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [slides, setSlides] = useState<{ image_url: string; link_to?: string }[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('banners')
          .select('image_url:image, link_to:link_url')
          .eq('status', 'active')
          .order('order_index', { ascending: true })
          .order('created_at', { ascending: false });

        if (!error && data) {
          setSlides(data);
        } else {
          setSlides([]);
        }
      } catch {
        setSlides([]);
      }
    };
    load();
  }, []);

  const imageIndex = (page % (slides.length || 1));

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [isPaused, page, slides]);

  if (slides.length === 0) {
    return <div className="relative h-[55vh] min-h-[450px] sm:h-[65vh] sm:min-h-[550px] md:h-[70vh] md:min-h-[600px] bg-gray-200 animate-pulse"></div>;
  }

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className="absolute w-full h-full"
        >
          {slides[imageIndex]?.link_to ? (
            <a href={slides[imageIndex].link_to} target="_blank" rel="noopener noreferrer">
              <Image src={slides[imageIndex].image_url} alt={`Banner slide ${imageIndex + 1}`} fill priority={imageIndex === 0} className="object-cover" />
            </a>
          ) : (
            <Image src={slides[imageIndex].image_url} alt={`Banner slide ${imageIndex + 1}`} fill priority={imageIndex === 0} className="object-cover" />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-4 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === imageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
