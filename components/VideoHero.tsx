'use client';

import React, { useRef, useEffect } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

interface VideoHeroProps {
  onExploreProducts: () => void;
  onBookAppointment: () => void;
}

export function VideoHero({ onExploreProducts, onBookAppointment }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Guarantee seamless video playback across Chrome, Safari, Firefox, and mobile (muted by default)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch((err) => {
        console.warn('Video autoplay waiting for interaction:', err);
      });
    }
  }, []);

  return (
    <section
      id="hero-section"
      className="relative min-h-[90vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#111315]"
    >
      {/* Real Cinematic Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-video-poster.jpg"
        aria-hidden="true"
        className="hero-video absolute inset-0 w-full h-full object-cover object-center z-0"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay at approximately 48% opacity above the video for optimal contrast and readability */}
      <div
        className="absolute inset-0 bg-black/48 pointer-events-none z-[1]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#111315]/80 via-transparent to-black/30 pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {/* Hero Content Overlay (Above video, z-10) - Visually centered */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-center flex flex-col items-center">
        {/* Hero Headline (DM Serif Display 64px desktop / 40px mobile) */}
        <h1 className="type-hero-headline text-white max-w-4xl text-balance tracking-tight drop-shadow-md">
          Hair Solutions, Tailored to You.
        </h1>

        {/* Supporting text (Manrope 18px desktop / 16px mobile) */}
        <p className="mt-6 text-token-16 md:text-token-18 text-[#E1E7EB] max-w-2xl text-balance font-normal leading-relaxed drop-shadow-sm">
          Explore hair solutions and discover expert guidance to find an option that suits your needs.
        </p>

        {/* Dual Customer Journey CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Journey 1: Shop Online */}
          <button
            type="button"
            onClick={onExploreProducts}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#01B1EE] hover:bg-[#00A2D9] text-[#111315] font-bold text-token-16 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Journey 2: Get Expert Consultation */}
          <button
            type="button"
            onClick={onBookAppointment}
            className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-semibold text-token-16 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Calendar className="w-5 h-5 text-[#01B1EE]" />
            <span>Book an Appointment</span>
          </button>
        </div>
      </div>
    </section>
  );
}
