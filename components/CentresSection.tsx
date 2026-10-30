'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { MapPin, Clock, Phone, Navigation, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CentresSectionProps {
  onBookAtCentre: (centreName: string) => void;
}

interface BranchItem {
  id: string;
  name: string;
  address: string;
  hours: string;
  phones: string[];
  image: string;
  imageAlt: string;
  mapUrl: string;
}

const BRANCHES: BranchItem[] = [
  {
    id: 'raipur-main',
    name: 'Raipur (Main Branch)',
    address:
      'First Floor, Great Eastern (G.E.) Road, Opposite Anupam Garden & Ayurvedic College, Near Amit Sales, Raipur, Chhattisgarh – 492010',
    hours: 'Mon – Sun: 10:00 AM – 8:00 PM',
    phones: ['+91 99932 39828', '+91 91449 39828'],
    image: '/images/branches/raipur-main.png',
    imageAlt: 'Mahaveer Hair Solution Main Branch interior reception in Raipur',
    mapUrl: 'https://maps.google.com/?q=Mahaveer+Hair+Solution+Raipur+GE+Road',
  },
  {
    id: 'raipur-mowa',
    name: 'Raipur (Mowa Branch)',
    address:
      'Shop No. 118, First Floor, Orange Hive, Vidhan Sabha Rd, LIC Colony, Mowa, Raipur, Chhattisgarh 492014',
    hours: 'Mon – Sun: 10:00 AM – 8:00 PM',
    phones: ['+91 99932 39828', '+91 91449 39828'],
    image: '/images/branches/raipur-mowa.png',
    imageAlt: 'Mahaveer Hair Solution Mowa Branch salon styling floor in Raipur',
    mapUrl: 'https://maps.google.com/?q=Orange+Hive+Vidhan+Sabha+Rd+Mowa+Raipur',
  },
  {
    id: 'jagdalpur',
    name: 'Jagdalpur Branch',
    address:
      'Main Road, Near Sanjay Market & City Center, Dharampura, Jagdalpur, Bastar, Chhattisgarh – 494001',
    hours: 'Mon – Sun: 10:00 AM – 8:00 PM',
    phones: ['+91 99932 39828', '+91 91449 39828'],
    image: '/images/branches/jagdalpur.jpg',
    imageAlt: 'Mahaveer Hair Solution modern styling studio in Jagdalpur',
    mapUrl: 'https://maps.google.com/?q=Mahaveer+Hair+Solution+Jagdalpur+Chhattisgarh',
  },
  {
    id: 'bilaspur',
    name: 'Bilaspur Branch',
    address:
      'Vyapar Vihar & Link Road Commercial Hub, Near New Bus Stand, Bilaspur, Chhattisgarh – 495001',
    hours: 'Mon – Sun: 10:00 AM – 8:00 PM',
    phones: ['+91 99932 39828', '+91 96916 99382'],
    image: '/images/branches/bilaspur.png',
    imageAlt: 'Mahaveer Hair Solution consultation and hair styling studio in Bilaspur',
    mapUrl: 'https://maps.google.com/?q=Mahaveer+Hair+Solution+Bilaspur+Chhattisgarh',
  },
  {
    id: 'sambalpur',
    name: 'Sambalpur Branch',
    address:
      'Main Commercial Complex, Near Budharaja & Fatak, Sambalpur, Odisha – 768001',
    hours: 'Mon – Sun: 10:30 AM – 7:30 PM',
    phones: ['+91 99932 39828', '+91 91449 39828'],
    image: '/images/branches/sambalpur.jpg',
    imageAlt: 'Mahaveer Hair Solution private hair system studio in Sambalpur',
    mapUrl: 'https://maps.google.com/?q=Mahaveer+Hair+Solution+Sambalpur+Odisha',
  },
];

export function CentresSection({ onBookAtCentre }: CentresSectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Responsive mobile vs desktop view detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop groups 2 cards per slide (3 slides total: [0,1], [2,3], [4])
  // Mobile displays 1 card per slide (5 slides total)
  const desktopSlides: BranchItem[][] = [
    [BRANCHES[0], BRANCHES[1]],
    [BRANCHES[2], BRANCHES[3]],
    [BRANCHES[4]],
  ];
  const mobileSlides: BranchItem[][] = BRANCHES.map((b) => [b]);

  const activeSlides = isMobile ? mobileSlides : desktopSlides;
  const totalSlides = activeSlides.length;

  // Keep slideIndex clamped if viewport breakpoint changes
  const safeSlideIndex = Math.min(slideIndex, totalSlides - 1);

  const handlePrev = () => {
    if (safeSlideIndex > 0) {
      setDirection(-1);
      setSlideIndex(safeSlideIndex - 1);
    }
  };

  const handleNext = () => {
    if (safeSlideIndex < totalSlides - 1) {
      setDirection(1);
      setSlideIndex(safeSlideIndex + 1);
    }
  };

  const goToSlide = (idx: number) => {
    if (idx !== safeSlideIndex) {
      setDirection(idx > safeSlideIndex ? 1 : -1);
      setSlideIndex(idx);
    }
  };

  // Touch gesture support for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const currentCards = activeSlides[safeSlideIndex] || [];

  return (
    <section id="branches" className="relative py-12 sm:py-16 md:py-20 bg-white">
      {/* Anchor target to preserve backward-compatible navigation links to #centres */}
      <span id="centres" className="absolute -top-24 opacity-0 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Left-aligned, minimal, clean */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <p className="text-[#01B1EE] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3 font-body">
            VISIT US
          </p>
          <h2 className="type-section-heading text-[#111315]">
            Our Branches
          </h2>
          <p className="mt-3 text-token-16 text-[#697780] max-w-2xl font-body leading-relaxed">
            Experience expert consultations and personalised care at our branches across Chhattisgarh and Odisha.
          </p>
        </div>

        {/* Carousel Container with Side Navigation Arrows */}
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={safeSlideIndex === 0}
            className="absolute -left-3 sm:-left-5 lg:-left-6 top-[35%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-[#E1E7EB] shadow-md flex items-center justify-center text-[#111315] hover:border-[#01B1EE] hover:text-[#01B1EE] transition-all focus:outline-hidden disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#E1E7EB] disabled:hover:text-[#111315] cursor-pointer"
            aria-label="Previous branch slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={safeSlideIndex === totalSlides - 1}
            className="absolute -right-3 sm:-right-5 lg:-right-6 top-[35%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-[#E1E7EB] shadow-md flex items-center justify-center text-[#111315] hover:border-[#01B1EE] hover:text-[#01B1EE] transition-all focus:outline-hidden disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#E1E7EB] disabled:hover:text-[#111315] cursor-pointer"
            aria-label="Next branch slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Carousel Viewport */}
          <div
            className="overflow-hidden px-1 py-1"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${isMobile ? 'm' : 'd'}-${safeSlideIndex}`}
                initial={{ opacity: 0, x: direction >= 0 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -30 : 30 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
              >
                {currentCards.map((branch) => (
                  <div
                    key={branch.id}
                    className="bg-white rounded-2xl border border-[#E1E7EB] shadow-xs hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Branch Interior Photograph */}
                    <div className="relative w-full h-64 sm:h-72 md:h-76 overflow-hidden bg-slate-100">
                      <Image
                        src={branch.image}
                        alt={branch.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center"
                        referrerPolicy="no-referrer"
                        priority={safeSlideIndex === 0}
                      />
                    </div>

                    {/* Branch Card Information */}
                    <div className="p-6 sm:p-7 md:p-8 flex-1 flex flex-col justify-between">
                      {/* Name and Details */}
                      <div>
                        {/* Branch Name */}
                        <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-[#111315] leading-snug tracking-tight mb-5">
                          {branch.name}
                        </h3>

                        {/* Details List */}
                        <div className="space-y-3.5">
                          {/* Address */}
                          <div className="flex items-start gap-3.5 text-[#47515A] text-[15px] leading-relaxed">
                            <MapPin className="w-5 h-5 text-[#01B1EE] shrink-0 mt-0.5" />
                            <span>{branch.address}</span>
                          </div>

                          {/* Hours */}
                          <div className="flex items-center gap-3.5 text-[#47515A] text-[15px] leading-relaxed">
                            <Clock className="w-5 h-5 text-[#01B1EE] shrink-0" />
                            <span>{branch.hours}</span>
                          </div>

                          {/* Phones */}
                          <div className="flex items-start gap-3.5 text-[#47515A] text-[15px] leading-relaxed">
                            <Phone className="w-5 h-5 text-[#01B1EE] shrink-0 mt-0.5" />
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              {branch.phones.map((phone, pIdx) => (
                                <a
                                  key={pIdx}
                                  href={`tel:${phone.replace(/\s+/g, '')}`}
                                  className="text-[#01B1EE] hover:text-[#008BBF] underline underline-offset-2 font-medium tracking-wide transition-colors"
                                >
                                  {phone}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom CTA Actions - Side by Side */}
                      <div className="mt-6 pt-5 border-t border-[#E1E7EB]">
                        <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3">
                          {/* Book Now Button */}
                          <button
                            type="button"
                            onClick={() => onBookAtCentre(branch.name)}
                            className="w-full h-[50px] px-3 bg-[#01B1EE] hover:bg-[#009ED6] text-white font-semibold text-[15px] rounded-xl transition-colors duration-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                          >
                            <Calendar className="w-4 h-4 shrink-0 text-white" />
                            <span>Book Now</span>
                          </button>

                          {/* Get Directions Button */}
                          <a
                            href={branch.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-[50px] px-3 bg-white hover:bg-[#F0FAFD] border border-[#01B1EE] text-[#01B1EE] hover:text-[#008BBF] font-semibold text-[15px] rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                          >
                            <Navigation className="w-4 h-4 shrink-0 text-[#01B1EE]" />
                            <span>Get Directions</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Standardized Pagination Indicators: 8px Grey Dots & 28px Cyan Pill */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#01B1EE] ${
                  safeSlideIndex === idx
                    ? 'w-7 bg-[#01B1EE]'
                    : 'w-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={safeSlideIndex === idx ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
