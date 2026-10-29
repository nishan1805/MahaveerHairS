'use client';

import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, Clock, ArrowUp, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenAccount: () => void;
}

export function Footer({ onOpenConsultation, onOpenAccount }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#111315] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2 space-y-5">
            <div>
              <Logo size="2x" className="py-0" />
            </div>

            <p className="text-token-14 text-[#94A3B8] leading-relaxed max-w-sm">
              Premier non-surgical hair restoration studio and wig specialist in Raipur, Chhattisgarh. Specializing in custom-molded hair patches, 100% human hair systems, and discreet consultation services.
            </p>

            <div className="space-y-2 text-token-14 text-[#CBD5E1]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#01B1EE] shrink-0 mt-1" />
                <span className="text-token-12">
                  First Floor, G.E. Road, Opposite Anupam Garden & Ayurvedic College, Samta Colony / Choubey Colony, Raipur, Chhattisgarh – 492010
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#01B1EE] shrink-0" />
                <span className="text-token-14 tabular-nums">+91 99932 39828 / +91 91449 39828</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#01B1EE] shrink-0" />
                <span className="text-token-12 text-[#94A3B8]">Open Daily: 10:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column 2: Hair Solutions (Shop) */}
          <div className="space-y-3">
            <h3 className="text-token-14 font-bold tracking-wider uppercase text-white">
              Hair Solutions
            </h3>
            <ul className="space-y-2 text-token-14 text-[#94A3B8]">
              <li>
                <a href="#categories" className="hover:text-[#01B1EE] transition-colors">
                  Hair Patches & Systems
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#01B1EE] transition-colors">
                  Custom Lace Front Wigs
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#01B1EE] transition-colors">
                  Medical Monofilament Wigs
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#01B1EE] transition-colors">
                  Remy Human Hair Extensions
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#01B1EE] transition-colors">
                  In-Stock Available Units
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Professional Services */}
          <div className="space-y-3">
            <h3 className="text-token-14 font-bold tracking-wider uppercase text-white">
              Studio Services
            </h3>
            <ul className="space-y-2 text-token-14 text-[#94A3B8]">
              <li>
                <a href="#services" className="hover:text-[#01B1EE] transition-colors">
                  Hair Patch Custom Fitting
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#01B1EE] transition-colors">
                  System Re-Taping & Maintenance
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#01B1EE] transition-colors">
                  Scalp Geometry Analysis
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#01B1EE] transition-colors">
                  Extensions Application
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="text-[#01B1EE] hover:underline font-medium text-left"
                >
                  Book Private Consultation →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer & Centres */}
          <div className="space-y-3">
            <h3 className="text-token-14 font-bold tracking-wider uppercase text-white">
              Centres & Account
            </h3>
            <ul className="space-y-2 text-token-14 text-[#94A3B8]">
              <li>
                <a href="#centres" className="hover:text-[#01B1EE] transition-colors">
                  Raipur Flagship Studio
                </a>
              </li>
              <li>
                <a href="#centres" className="hover:text-[#01B1EE] transition-colors">
                  Bilaspur Consultation Desk
                </a>
              </li>
              <li>
                <a href="#centres" className="hover:text-[#01B1EE] transition-colors">
                  Sambalpur Consultation Point
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAccount}
                  className="hover:text-[#01B1EE] transition-colors text-left"
                >
                  Customer Account & Login
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#01B1EE] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-token-12 text-[#64748B]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} Mahaveer Hair Solution. All rights reserved.</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy (Prototype)
            </span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Client Confidentiality Guidelines
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center gap-1.5 border border-white/10"
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
