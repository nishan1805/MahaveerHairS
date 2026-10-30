'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import {
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Calendar,
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenConsultation: () => void;
  isScrolled: boolean;
  onMobileMenuChange?: (open: boolean) => void;
}

export function Navbar({
  cartCount,
  onOpenCart,
  onOpenAccount,
  onOpenConsultation,
  isScrolled,
  onMobileMenuChange,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  // Notify parent of mobile menu open state and lock body scroll
  useEffect(() => {
    onMobileMenuChange?.(mobileMenuOpen);
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [mobileMenuOpen, onMobileMenuChange]);

  // Close mobile drawer on route / anchor jump
  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    setMobileShopOpen(false);
    setShopDropdownOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#shop-dropdown-container')) {
        setShopDropdownOpen(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E1E7EB] shadow-xs py-2 md:py-2.5'
          : 'bg-transparent py-3 md:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 lg:gap-8">
          {/* Zone 1: Logo */}
          <div className="shrink-0 flex items-center">
            <Logo isTransparentHeader={!isScrolled && !mobileMenuOpen} />
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* Shop with Dropdown */}
            <div id="shop-dropdown-container" className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShopDropdownOpen(!shopDropdownOpen);
                }}
                className={`inline-flex items-center gap-1.5 text-token-16 font-medium transition-colors whitespace-nowrap py-1 ${
                  isScrolled
                    ? 'text-[#111315] hover:text-[#006F96]'
                    : 'text-white drop-shadow-sm hover:text-[#01B1EE]'
                }`}
                aria-expanded={shopDropdownOpen}
              >
                <span>Shop</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    shopDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {shopDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#E1E7EB] py-3 px-4 z-50 animate-fade-in space-y-2.5">
                  <div className="text-token-14 font-medium text-[#111315]">
                    Hair Patches / Hair Systems
                  </div>
                  <div className="text-token-14 font-medium text-[#111315]">
                    Custom Lace &amp; Monofilament Wigs
                  </div>
                  <div className="text-token-14 font-medium text-[#111315]">
                    100% Remy Hair Extensions
                  </div>
                </div>
              )}
            </div>

            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('services');
              }}
              className={`text-token-16 font-medium transition-colors whitespace-nowrap ${
                isScrolled
                  ? 'text-[#111315] hover:text-[#006F96]'
                  : 'text-white drop-shadow-sm hover:text-[#01B1EE]'
              }`}
            >
              Services
            </a>

            <a
              href="#centres"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('centres');
              }}
              className={`text-token-16 font-medium transition-colors whitespace-nowrap ${
                isScrolled
                  ? 'text-[#111315] hover:text-[#006F96]'
                  : 'text-white drop-shadow-sm hover:text-[#01B1EE]'
              }`}
            >
              Our Centres
            </a>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
              className={`text-token-16 font-medium transition-colors whitespace-nowrap ${
                isScrolled
                  ? 'text-[#111315] hover:text-[#006F96]'
                  : 'text-white drop-shadow-sm hover:text-[#01B1EE]'
              }`}
            >
              About
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className={`text-token-16 font-medium transition-colors whitespace-nowrap ${
                isScrolled
                  ? 'text-[#111315] hover:text-[#006F96]'
                  : 'text-white drop-shadow-sm hover:text-[#01B1EE]'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Actions (Account, Cart, Primary CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Account Icon */}
            <button
              type="button"
              onClick={onOpenAccount}
              className={`p-2 rounded-full transition-colors ${
                isScrolled || mobileMenuOpen
                  ? 'text-[#111315] hover:bg-slate-100'
                  : 'text-white hover:bg-white/20'
              }`}
              aria-label="Customer Account Login"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <button
              type="button"
              onClick={onOpenCart}
              className={`relative p-2 rounded-full transition-colors ${
                isScrolled || mobileMenuOpen
                  ? 'text-[#111315] hover:bg-slate-100'
                  : 'text-white hover:bg-white/20'
              }`}
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#01B1EE] text-[#111315] text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary CTA: Book an Appointment */}
            <button
              type="button"
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#01B1EE] hover:bg-[#00A2D9] text-[#111315] font-semibold text-token-14 md:text-token-16 py-2 px-4 rounded-lg transition-colors shadow-xs active:translate-y-px whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled || mobileMenuOpen ? 'text-[#111315]' : 'text-white bg-black/30'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu Panel (Full-height white background extending to bottom of viewport) */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-[#E1E7EB] shadow-2xl animate-fade-in h-[calc(100vh-100%)] h-[calc(100dvh-100%)] min-h-[calc(100vh-100%)] min-h-[calc(100dvh-100%)] overflow-y-auto p-5 sm:p-6 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            {/* Expandable Shop Collections Accordion */}
            <div className="pb-3 border-b border-[#E1E7EB]">
              <button
                type="button"
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className="w-full flex items-center justify-between py-2 text-left text-[#111315] font-semibold text-token-18 hover:text-[#006F96] transition-colors"
                aria-expanded={mobileShopOpen}
              >
                <span>Shop Collections</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#697780] transition-transform duration-200 ${
                    mobileShopOpen ? 'rotate-180 text-[#01B1EE]' : ''
                  }`}
                />
              </button>

              {mobileShopOpen && (
                <div className="pl-3 pr-1 py-2 space-y-2 mt-1 border-l-2 border-[#01B1EE]/30 animate-fade-in">
                  <a
                    href="#categories"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('categories');
                    }}
                    className="block py-1.5 text-token-15 font-semibold text-[#006F96] hover:text-[#01B1EE]"
                  >
                    All Hair Solutions
                  </a>
                  <a
                    href="#categories"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('categories');
                    }}
                    className="block py-1 text-token-15 text-[#47515A] hover:text-[#111315]"
                  >
                    Hair Patches / Hair Systems
                  </a>
                  <a
                    href="#categories"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('categories');
                    }}
                    className="block py-1 text-token-15 text-[#47515A] hover:text-[#111315]"
                  >
                    Custom Lace Front Wigs
                  </a>
                  <a
                    href="#categories"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('categories');
                    }}
                    className="block py-1 text-token-15 text-[#47515A] hover:text-[#111315]"
                  >
                    Hair Extensions
                  </a>
                </div>
              )}
            </div>

            {/* Standard Nav Links */}
            <div className="space-y-1.5 py-1 border-b border-[#E1E7EB]">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('services');
                }}
                className="block py-2 text-token-17 font-semibold text-[#111315] hover:text-[#006F96]"
              >
                Our Services
              </a>
              <a
                href="#centres"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('centres');
                }}
                className="block py-2 text-token-17 font-semibold text-[#111315] hover:text-[#006F96]"
              >
                Our Centres (Raipur &amp; Regional)
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('about');
                }}
                className="block py-2 text-token-17 font-semibold text-[#111315] hover:text-[#006F96]"
              >
                About Mahaveer
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contact');
                }}
                className="block py-2 text-token-17 font-semibold text-[#111315] hover:text-[#006F96]"
              >
                Contact &amp; Support
              </a>
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 px-4 bg-[#01B1EE] hover:bg-[#00A2D9] text-[#111315] font-semibold text-token-16 rounded-xl text-center flex items-center justify-center gap-2 shadow-xs active:scale-[0.99] transition-all"
            >
              <Calendar className="w-5 h-5" />
              <span>Book an Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
