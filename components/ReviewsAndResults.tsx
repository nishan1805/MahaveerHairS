'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ReviewsAndResultsProps {
  onOpenConsultation: () => void;
}

export function ReviewsAndResults({ onOpenConsultation }: ReviewsAndResultsProps) {
  const [sliderPos, setSliderPos] = useState(50);

  const reviews = [
    {
      name: 'R. K. Agrawal',
      location: 'Raipur, Chhattisgarh',
      service: 'Poly Skin Hair System',
      verified: true,
      rating: 5,
      date: 'Recent Client Review',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      comment:
        'Visited the Mahaveer centre near Anupam Garden. The hairline blending is completely seamless and natural. The staff is polite, professional, and took time to explain the maintenance routine.',
    },
    {
      name: 'Priya S.',
      location: 'Bhilai, Chhattisgarh',
      service: 'Custom Front Lace Wig',
      verified: true,
      rating: 5,
      date: 'Recent Client Review',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      comment:
        'Got a custom medical wig made here after thinning. The hair quality is genuinely 100% human hair—lightweight and comfortable even during summer. Highly recommend their private suite consultation.',
    },
    {
      name: 'Mohit Verma',
      location: 'Bilaspur, Chhattisgarh',
      service: 'Hair System Maintenance',
      verified: true,
      rating: 5,
      date: 'Recent Client Review',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      comment:
        'Regular customer for hair patch re-taping and servicing. Clean hygienic procedures and durable bonding that easily lasts 3-4 weeks without slipping.',
    },
  ];

  return (
    <section id="reviews" className="py-20 bg-white border-b border-[#E1E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <p className="text-token-12 font-bold uppercase tracking-wider text-[#01B1EE] mb-2">
            Verified Experiences
          </p>
          <h2 className="type-section-heading text-[#111315]">
            Real Transformations. Real Experiences.
          </h2>
          <p className="mt-4 text-token-16 md:text-token-18 text-[#47515A] leading-relaxed">
            See genuine hairline restorations and read real feedback from clients who visit our consultation suites.
          </p>
        </div>

        {/* Subsection A: Real Before-and-After Hairline Restoration Showcase */}
        <div className="mb-16 bg-[#F7FAFC] rounded-2xl border border-[#E1E7EB] p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Interactive Before & After Comparison Showcase with Real Photographs */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-[#E1E7EB] bg-slate-900 shadow-sm select-none">
                {/* "After" side (Full Layer with real photograph) */}
                <div className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85"
                    alt="After non-surgical hair restoration procedure with full density"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded bg-[#01B1EE] text-[#111315] font-bold text-token-12 shadow-md">
                      AFTER · Natural Hair System
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded text-token-12 text-white">
                    Full Crown Density Restored
                  </div>
                </div>

                {/* "Before" side (Clipped Layer with real photograph) */}
                <div
                  className="absolute inset-y-0 left-0 border-r-2 border-white shadow-xl overflow-hidden transition-all duration-75"
                  style={{ width: `${sliderPos}%` }}
                >
                  <div className="relative w-full h-full min-w-[320px] sm:min-w-[480px] lg:min-w-[540px]">
                    <Image
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85"
                      alt="Before hair replacement showing hairline recession"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded bg-black/75 backdrop-blur-xs text-white font-semibold text-token-12 border border-white/20">
                        BEFORE · Receding Scalp
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-lg pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white shadow-md border-2 border-[#01B1EE] flex items-center justify-center text-[#111315] text-[11px] font-bold">
                    ⇄
                  </div>
                </div>
              </div>

              {/* Slider Input Control */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-token-12 font-medium text-[#47515A]">Drag slider to compare:</span>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="flex-1 accent-[#01B1EE] cursor-pointer h-2 bg-slate-200 rounded-lg"
                  aria-label="Comparison slider between before and after results"
                />
              </div>
            </div>

            {/* Explanation of procedure */}
            <div className="w-full lg:w-1/2 space-y-4">
              <span className="text-token-12 font-bold uppercase tracking-wider text-[#01B1EE]">
                Case Study Highlight
              </span>
              <h3 className="type-feature-heading text-[#111315]">
                Seamless Scalp Blending in One 90-Minute Sitting
              </h3>
              <p className="text-token-16 text-[#47515A] leading-relaxed">
                Non-surgical hair replacement allows instantaneous transformation without surgical risks, downtime, or waiting months for follicular grafts. Our specialists take precise measurements to align hair direction, curl pattern, and age-appropriate hairline recession.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-white rounded-xl border border-[#E1E7EB]">
                  <p className="text-token-12 text-[#697780]">Procedure Time</p>
                  <p className="text-token-16 font-bold text-[#111315]">90 Minutes</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[#E1E7EB]">
                  <p className="text-token-12 text-[#697780]">Attachment Method</p>
                  <p className="text-token-16 font-bold text-[#111315]">Breathable Medical Bond</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-2 text-token-14 font-semibold text-[#006F96] hover:underline"
                >
                  <span>Book Scalp Assessment for Custom Fitting</span>
                  <ArrowRight className="w-4 h-4 text-[#01B1EE]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subsection B: Customer Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-[#E1E7EB] bg-white hover:border-[#01B1EE]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#01B1EE]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-token-12 text-[#697780]">{rev.date}</span>
                </div>

                <p className="text-token-14 text-[#111315] italic leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E1E7EB] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-[#E1E7EB] shrink-0">
                    <Image
                      src={rev.avatar}
                      alt={rev.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-token-14 font-bold text-[#111315] flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      {rev.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#18794E]" />
                      )}
                    </h4>
                    <p className="text-token-12 text-[#697780]">{rev.location}</p>
                  </div>
                </div>

                <span className="text-token-12 font-medium text-[#006F96] bg-[#EAF8FE] px-2.5 py-1 rounded">
                  {rev.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#F7FAFC] border border-[#E1E7EB] rounded-xl text-token-16 font-semibold text-[#111315] shadow-2xs hover:border-[#01B1EE] transition-all"
          >
            <span>Explore All Results & Reviews</span>
            <ArrowRight className="w-4 h-4 text-[#01B1EE]" />
          </button>
        </div>
      </div>
    </section>
  );
}
