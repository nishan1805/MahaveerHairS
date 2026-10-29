'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
  isTransparentHeader?: boolean;
  size?: 'default' | '2x';
}

export function Logo({
  className = '',
  isTransparentHeader = true,
  size = 'default',
}: LogoProps) {
  // Use uploaded transparent white logo with cyan accents on dark backgrounds (hero header, footer).
  // On scrolled header with white background (!isTransparentHeader), switch to dark logo asset for clean contrast.
  const isDarkBackground = isTransparentHeader || size === '2x';
  const logoSrc = isDarkBackground
    ? '/assets/aistudio/MHS_logo_f9c2cc07.png'
    : '/assets/aistudio/MHS_Logo_084c6af9.png';

  const heightClasses =
    size === '2x'
      ? 'h-[72px] sm:h-[80px] md:h-[88px]'
      : 'h-9 sm:h-10 md:h-11';

  return (
    <a
      href="#"
      className={`inline-flex items-center select-none group transition-opacity hover:opacity-90 ${className}`}
      aria-label="Mahaveer Hair Solution Home"
    >
      <div className={`relative ${heightClasses} flex items-center`}>
        <Image
          src={logoSrc}
          alt="Mahaveer Hair Solution"
          width={4214}
          height={1492}
          priority
          referrerPolicy="no-referrer"
          className={`${heightClasses} w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]`}
        />
      </div>
    </a>
  );
}

