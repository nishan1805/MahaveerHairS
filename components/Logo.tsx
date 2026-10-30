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
  const logoSrc = '/images/MHS_logo_f9c2cc07.png';

  const heightClasses =
    size === '2x'
      ? 'h-[72px] sm:h-[80px] md:h-[88px]'
      : 'h-9 sm:h-10 md:h-11';

  // On scrolled header with light background, apply brightness-0 for crisp dark contrast
  const filterClass = !isTransparentHeader && size !== '2x' ? 'brightness-0' : '';

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
          className={`${heightClasses} w-auto object-contain transition-all duration-200 group-hover:scale-[1.02] ${filterClass}`}
        />
      </div>
    </a>
  );
}

