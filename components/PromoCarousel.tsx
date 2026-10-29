'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PromoCarouselProps {
  onSelectCollection?: (category: string) => void;
}

const SLIDES = [
  {
    id: 'mens-wigs-showcase',
    title: "Natural-Looking Men's Wigs Showcase",
    image: '/images/banner-slide-1.png',
    alt: "Mahaveer Hair Solution Premium Collection: Natural-Looking Men's Wigs with undetectable hairline and comfortable fit",
  },
  {
    id: 'womens-wigs-showcase',
    title: 'Natural Beauty. Everyday Confidence.',
    image: '/images/banner-slide-2.png',
    alt: 'Mahaveer Hair Solution Premium Collection: Natural Beauty, Everyday Confidence custom wigs and extensions',
  },
];

export function PromoCarousel({ onSelectCollection }: PromoCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Subscribe to external media query changes without synchronous set-state-in-effect
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Autoplay management: 5000ms loop, pauses on hover, focus, or reduced motion
  useEffect(() => {
    if (prefersReducedMotion || isHovered || isFocused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [nextSlide, isHovered, isFocused, prefersReducedMotion, currentSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  return (
    <section
      id="promotions"
      aria-roledescription="carousel"
      aria-label="Promotional collections carousel"
      className="w-full bg-white py-6 md:py-8 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Frame with Overlapping Clean Circular Controls */}
        <div className="relative">
          {/* Main Pure Image-Based Slide Container */}
          <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xs border border-[#E1E7EB]/70 bg-white">
            <div
              className={`flex w-full ${
                prefersReducedMotion ? '' : 'transition-transform duration-500 ease-in-out'
              }`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {SLIDES.map((slide, idx) => (
                <div key={slide.id} className="min-w-full w-full shrink-0">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    width={1440}
                    height={304}
                    priority={idx === 0}
                    className="w-full h-auto block object-cover"
                    sizes="(max-width: 768px) 100vw, 1280px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous promotional banner slide"
            className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-3 md:-left-4 lg:-left-5 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#EAF8FE] text-[#111315] hover:text-[#006F96] border border-[#E1E7EB] hover:border-[#01B1EE] shadow-md hover:shadow-lg flex items-center justify-center transition-all active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#01B1EE]"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next promotional banner slide"
            className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 md:-right-4 lg:-right-5 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#EAF8FE] text-[#111315] hover:text-[#006F96] border border-[#E1E7EB] hover:border-[#01B1EE] shadow-md hover:shadow-lg flex items-center justify-center transition-all active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#01B1EE]"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Standardized Pagination Indicators: 8px Grey Dots & 28px Cyan Pill */}
        <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                aria-current={isActive ? 'true' : 'false'}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#01B1EE] ${
                  isActive
                    ? 'w-7 bg-[#01B1EE]'
                    : 'w-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
