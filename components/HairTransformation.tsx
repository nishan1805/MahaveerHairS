'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TransformationSlide {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  alt: string;
}

const TRANSFORMATION_SLIDES: TransformationSlide[] = [
  {
    id: 'transformation-1',
    name: 'Hairline Restoration',
    beforeImage: '/images/transformations/customer-1-before.png',
    afterImage: '/images/transformations/customer-1-after.png',
    alt: 'Before and after non-surgical hair restoration showing natural hairline restoration',
  },
  {
    id: 'transformation-2',
    name: 'Male Pattern Baldness',
    beforeImage: '/images/transformations/customer-2-before.png',
    afterImage: '/images/transformations/customer-2-after.png',
    alt: 'Male pattern baldness restored with customized breathable hair system',
  },
  {
    id: 'transformation-3',
    name: 'Crown Density Restoration',
    beforeImage: '/images/transformations/customer-3-before.png',
    afterImage: '/images/transformations/customer-3-after.png',
    alt: 'Crown hair density restoration with natural human hair volume',
  },
  {
    id: 'transformation-4',
    name: 'Salt & Pepper Natural Style',
    beforeImage: '/images/transformations/customer-4-before.png',
    afterImage: '/images/transformations/customer-4-after.png',
    alt: 'Distinguished natural salt and pepper hair system styling transformation',
  },
];

export function HairTransformation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const slideCount = TRANSFORMATION_SLIDES.length;

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
    setSliderPos(50);
  }, [slideCount]);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
    setSliderPos(50);
  }, [slideCount]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setSliderPos(50);
  }, []);

  // Update slider position based on coordinate
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      setIsDragging(true);
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging, handleMove]);

  const activeSlide = TRANSFORMATION_SLIDES[currentSlide];

  return (
    <section
      id="transformations"
      className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Centered Eyebrow, Heading & Supporting text */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <p className="text-[#01B1EE] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3 font-body">
            REAL TRANSFORMATIONS
          </p>
          <h2 className="type-section-heading text-[#111315]">
            See the Difference
          </h2>
          <p className="mt-3 text-token-16 text-[#697780] max-w-2xl mx-auto font-body">
            Genuine results from our customers who chose Mahaveer Hair Solution for a natural and
            confident look.
          </p>
        </div>

        {/* Carousel & Interactive Dual-Layer Comparison Slider Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* External Left Circular Navigation Button */}
          <button
            type="button"
            onClick={goToPrev}
            className="absolute -left-4 sm:-left-6 lg:-left-16 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-md border border-[#E1E7EB] hover:border-[#01B1EE] hover:bg-[#F4FBFE] flex items-center justify-center text-[#111315] hover:text-[#01B1EE] transition-all cursor-pointer group active:scale-95"
            aria-label="Previous customer transformation"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* External Right Circular Navigation Button */}
          <button
            type="button"
            onClick={goToNext}
            className="absolute -right-4 sm:-right-6 lg:-right-16 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-md border border-[#E1E7EB] hover:border-[#01B1EE] hover:bg-[#F4FBFE] flex items-center justify-center text-[#111315] hover:text-[#01B1EE] transition-all cursor-pointer group active:scale-95"
            aria-label="Next customer transformation"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Interactive Comparison Dual-Layer Box */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] md:aspect-[16/9] rounded-2xl md:rounded-[28px] overflow-hidden select-none border border-[#E1E7EB] shadow-md bg-slate-100 cursor-ew-resize"
            style={{ touchAction: 'none' }}
          >
            {/* Base Layer: After Image */}
            <Image
              src={activeSlide.afterImage}
              alt={`${activeSlide.name} After hair restoration`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1040px"
              className="object-cover object-center pointer-events-none"
            />

            {/* Top Layer: Before Image Clipped with sliderPos */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <Image
                src={activeSlide.beforeImage}
                alt={`${activeSlide.name} Before hair restoration`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1040px"
                className="object-cover object-center"
              />
            </div>

            {/* Top-Left 'Before' Badge */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 pointer-events-none">
              <span className="px-3.5 sm:px-4 py-1.5 rounded-lg bg-[#111315]/75 backdrop-blur-md text-white text-xs sm:text-sm font-semibold tracking-wide shadow-sm border border-white/10 font-body">
                Before
              </span>
            </div>

            {/* Top-Right 'After' Badge */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 pointer-events-none">
              <span className="px-3.5 sm:px-4 py-1.5 rounded-lg bg-[#01B1EE] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md font-body">
                After
              </span>
            </div>

            {/* Draggable Vertical Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] pointer-events-none z-20"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Minimal Divider Grip Indicator */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-10 rounded-full bg-white shadow-md border border-[#D5E0E6] flex items-center justify-center pointer-events-none">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-3.5 bg-[#94A3B8] rounded-full" />
                  <div className="w-0.5 h-3.5 bg-[#94A3B8] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Standardized Pagination Indicators: 8px Grey Dots & 28px Cyan Pill */}
          <div
            className="flex items-center justify-center gap-2 mt-8 sm:mt-10"
            role="tablist"
            aria-label="Customer transformation slides"
          >
            {TRANSFORMATION_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#01B1EE] ${
                    isActive
                      ? 'w-7 bg-[#01B1EE]'
                      : 'w-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-selected={isActive}
                  role="tab"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HairTransformation;
