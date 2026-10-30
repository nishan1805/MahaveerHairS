'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Heart, Scissors } from 'lucide-react';

interface ServicesSectionProps {
  onBookService: (serviceName: string) => void;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'patch-fitting',
    title: 'Hair Patch Fitting & Styling',
    description: 'Personalized fitting and styling for a natural look.',
    image: '/images/services/patch-fitting.png',
    imageAlt: 'Professional stylist hands performing custom hair patch fitting and styling',
  },
  {
    id: 'system-maintenance',
    title: 'Hair System Maintenance',
    description: 'Professional care to keep your hair system clean and healthy.',
    image: '/images/services/system-maintenance.png',
    imageAlt: 'Deep cleansing and professional salon hair system maintenance wash',
  },
  {
    id: 'wig-consultation',
    title: 'Wig Consultation & Fitting',
    description: 'Expert guidance and personalized fitting for a seamless look.',
    image: '/images/services/wig-consultation.png',
    imageAlt: 'Expert hands placing and fitting a custom natural wig cap',
  },
  {
    id: 'extensions-service',
    title: 'Hair Extensions Service',
    description: 'Natural-looking extensions with expert application.',
    image: '/images/services/extensions-service.png',
    imageAlt: 'Seamless strand sectioning and professional hair extensions application',
  },
];

export function ServicesSection({ onBookService }: ServicesSectionProps) {
  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <p className="text-[#01B1EE] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3 font-body">
            IN-SALON PROFESSIONAL CARE
          </p>

          {/* Heading in DM Serif Display */}
          <h2 className="type-section-heading text-[#111315]">
            Expert Care for Your Hair
          </h2>

          {/* Short Supporting Description in Manrope */}
          <p className="mt-3 text-token-16 text-[#697780] max-w-2xl font-body">
            Explore our professional hair solutions and find the right next step for your needs.
          </p>
        </div>

        {/* 4 Service Cards: 4 columns on desktop, 2 columns on tablet, 1 column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-[#E1E7EB] shadow-xs hover:border-[#01B1EE]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Prominent Service Photography Area */}
              <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100 rounded-t-2xl">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Service Information Area */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Service Title */}
                  <h3 className="text-token-18 font-bold font-display text-[#111315] mb-2 leading-snug">
                    {service.title}
                  </h3>

                  {/* Concise Description: Exactly two lines at desktop */}
                  <p className="text-token-14 text-[#697780] leading-relaxed line-clamp-2 min-h-[44px] font-body">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5">
                  {/* Full-Width Outlined Book Service Button */}
                  <button
                    type="button"
                    onClick={() => onBookService(service.title)}
                    className="w-full py-3 px-4 rounded-xl border border-[#E1E7EB] hover:border-[#01B1EE] hover:bg-[#EAF8FE] text-[#111315] hover:text-[#006F96] font-semibold text-token-14 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-[0.98] font-body group/btn"
                    aria-label={`Book ${service.title}`}
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-4 h-4 text-[#01B1EE] transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integrated Brand Introduction Area (#about anchor for Navbar navigation) */}
        <div
          id="about"
          className="mt-16 lg:mt-24 rounded-3xl md:rounded-[36px] bg-gradient-to-br from-[#FFFFFF] via-[#F8FDFF] to-[#EBF8FE] border border-[#E1E7EB] p-8 sm:p-10 md:p-12 lg:p-14 relative overflow-hidden shadow-xs"
        >
          {/* Background Decorative Cyan Arcs */}
          <svg
            className="absolute -bottom-16 -right-16 w-80 h-80 pointer-events-none text-[#01B1EE]"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="160" cy="160" r="130" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="6 6" />
            <circle cx="160" cy="160" r="95" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />
            <circle cx="160" cy="160" r="60" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-start relative z-10">
            {/* Left Column: Eyebrow, Heading, Description, Benefits, CTA */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              {/* Eyebrow Label */}
              <p className="text-[#01B1EE] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3 font-body">
                ABOUT MAHAVEER HAIR SOLUTION
              </p>

              {/* Main Heading */}
              <h2 className="type-section-heading text-[#111315]">
                Craftsmanship, Discretion &amp; Natural Aesthetics
              </h2>

              {/* Description */}
              <p className="mt-3 text-token-16 text-[#697780] font-body max-w-xl leading-relaxed">
                Mahaveer Hair Solution was established in Raipur to provide authentic, dignified, and
                natural-looking hair solutions. Our studio focuses on personalized care, modern techniques,
                and professional styling to help you look and feel your best.
              </p>

              {/* 3 Compact Benefit Items with subtle vertical dividers */}
              <div className="mt-8 pt-6 border-t border-[#E1E7EB]/80 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 sm:divide-x sm:divide-[#E1E7EB]">
                {/* Benefit 1 */}
                <div className="flex flex-col sm:pr-4">
                  <div className="w-10 h-10 rounded-full bg-[#E0F4FD] flex items-center justify-center text-[#01B1EE] mb-3">
                    <ShieldCheck className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-bold text-[#111315] text-[15px] font-body">Certified Specialists</h3>
                  <p className="mt-1 text-xs sm:text-[13px] text-[#6B7785] leading-normal font-body">
                    Skilled professionals with real expertise.
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="flex flex-col sm:px-4">
                  <div className="w-10 h-10 rounded-full bg-[#E0F4FD] flex items-center justify-center text-[#01B1EE] mb-3">
                    <Heart className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-bold text-[#111315] text-[15px] font-body">Private Consultation</h3>
                  <p className="mt-1 text-xs sm:text-[13px] text-[#6B7785] leading-normal font-body">
                    A comfortable and discreet experience.
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className="flex flex-col sm:pl-4">
                  <div className="w-10 h-10 rounded-full bg-[#E0F4FD] flex items-center justify-center text-[#01B1EE] mb-3">
                    <Scissors className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-bold text-[#111315] text-[15px] font-body">Personalized Styling</h3>
                  <p className="mt-1 text-xs sm:text-[13px] text-[#6B7785] leading-normal font-body">
                    Solutions tailored to your look and needs.
                  </p>
                </div>
              </div>

              {/* Tertiary CTA Text Link */}
              <div className="mt-8">
                <a
                  href="#centres"
                  className="inline-flex items-center gap-2 group pb-0.5 border-b-2 border-[#01B1EE] text-[#111315] hover:text-[#01B1EE] font-semibold text-token-15 transition-colors font-body"
                >
                  <span>Know more</span>
                  <ArrowRight className="w-4 h-4 text-[#01B1EE] transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right Column: Taller Salon Interior Photograph aligned with main heading */}
            <div className="lg:col-span-6 flex flex-col justify-start w-full">
              <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] xl:h-[520px] rounded-2xl md:rounded-[28px] overflow-hidden shadow-sm border border-white/80 bg-slate-100">
                <Image
                  src="/images/about-salon.png"
                  alt="Mahaveer Hair Solution luxury modern salon interior in Raipur"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
