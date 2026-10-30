'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/contact';

// Pure, crisp WhatsApp brand vector SVG
function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.956.564 3.784 1.54 5.334L2.3 22l4.786-1.229a9.98 9.98 0 0 0 4.945 1.291h.004c5.534 0 10.03-4.496 10.03-10.031A10.03 10.03 0 0 0 12.031 2zm0 18.368c-1.636 0-3.238-.435-4.636-1.261l-.333-.198-2.844.73.76-2.772-.218-.348a8.318 8.318 0 0 1-1.328-4.488c0-4.611 3.753-8.364 8.366-8.364 2.234 0 4.334.871 5.914 2.451a8.32 8.32 0 0 1 2.449 5.913c0 4.611-3.754 8.367-8.364 8.367zm4.587-6.262c-.251-.126-1.488-.734-1.719-.818-.231-.084-.399-.126-.566.126-.168.252-.65 1.05-.798 1.218-.147.168-.294.189-.545.063-.252-.126-1.063-.392-2.025-1.25-.748-.668-1.253-1.493-1.4-1.745-.147-.252-.016-.388.11-.513.113-.113.252-.294.378-.441.126-.147.168-.252.252-.42.084-.168.042-.315-.021-.441-.063-.126-.566-1.365-.776-1.869-.205-.492-.413-.425-.566-.433l-.483-.008c-.168 0-.441.063-.672.315-.231.252-.882.861-.882 2.1 0 1.239.903 2.436 1.029 2.604.126.168 1.776 2.712 4.303 3.803.601.26 1.07.415 1.436.531.603.192 1.152.165 1.586.1.484-.072 1.488-.609 1.698-1.197.21-.588.21-1.092.147-1.197-.063-.105-.231-.168-.482-.294z" />
    </svg>
  );
}

export function FloatingActionButtons({ hidden = false }: { hidden?: boolean }) {
  if (hidden) return null;

  return (
    <aside
      aria-label="Direct Contact Shortcuts"
      className="fixed bottom-5 right-4 sm:bottom-7 sm:right-6 z-50 flex flex-col gap-3 sm:gap-3.5 items-center select-none"
    >
      {/* 1. Direct Call Floating Button */}
      <a
        href={CONTACT_INFO.telLink}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#01B1EE] hover:bg-[#009ED6] text-white shadow-lg shadow-[#01B1EE]/35 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-[#01B1EE]/60"
        aria-label={`Call Mahaveer Hair Solution at ${CONTACT_INFO.primaryPhone}`}
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white transition-transform duration-200 group-hover:rotate-12" />

        {/* Hover Tooltip (Desktop) */}
        <span className="pointer-events-none absolute right-full mr-3 hidden lg:inline-block px-2.5 py-1 text-xs font-semibold text-white bg-[#111315]/90 backdrop-blur-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-body">
          Call Us
        </span>
      </a>

      {/* 2. Direct WhatsApp Floating Button */}
      <a
        href={CONTACT_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5C] text-white shadow-lg shadow-[#25D366]/35 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-[#25D366]/60"
        aria-label="Chat with Mahaveer Hair Solution on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-white transition-transform duration-200 group-hover:scale-110" />

        {/* Hover Tooltip (Desktop) */}
        <span className="pointer-events-none absolute right-full mr-3 hidden lg:inline-block px-2.5 py-1 text-xs font-semibold text-white bg-[#111315]/90 backdrop-blur-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-body">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}
