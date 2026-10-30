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
}

export function Navbar({
  cartCount,
  onOpenCart,
  onOpenAccount,
  onOpenConsultation,
  isScrolled,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  // Close mobile drawer on route / anchor jump
  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
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
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E1E7EB] shadow-xs py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Logo */}
          <div className="shrink-0 flex items-center">
            <Logo isTransparentHeader={!isScrolled} />
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
                isScrolled
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
                isScrolled
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
                isScrolled ? 'text-[#111315]' : 'text-white bg-black/30'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[68px] z-50 bg-white border-b border-[#E1E7EB] shadow-xl animate-fade-in flex flex-col justify-between p-6 overflow-y-auto">
          <div className="space-y-4">
            <div className="space-y-1 pb-4 border-b border-[#E1E7EB]">
              <p className="text-token-12 font-bold uppercase tracking-wider text-[#697780]">
                Shop Collections
              </p>
              <a
                href="#categories"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('categories');
                }}
                className="block py-2 text-token-18 font-semibold text-[#111315]"
              >
                All Hair Solutions
              </a>
              <a
                href="#categories"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('categories');
                }}
                className="block py-1 text-token-16 text-[#47515A]"
              >
                Hair Patches / Hair Systems
              </a>
              <a
                href="#categories"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('categories');
                }}
                className="block py-1 text-token-16 text-[#47515A]"
              >
                Custom Lace Front Wigs
              </a>
              <a
                href="#categories"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('categories');
                }}
                className="block py-1 text-token-16 text-[#47515A]"
              >
                Hair Extensions
              </a>
            </div>

            <div className="space-y-2 py-2 border-b border-[#E1E7EB]">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('services');
                }}
                className="block py-2 text-token-18 font-semibold text-[#111315]"
              >
                Our Services
              </a>
              <a
                href="#centres"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('centres');
                }}
                className="block py-2 text-token-18 font-semibold text-[#111315]"
              >
                Our Centres (Raipur & Regional)
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('about');
                }}
                className="block py-2 text-token-18 font-semibold text-[#111315]"
              >
                About Mahaveer
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contact');
                }}
                className="block py-2 text-token-18 font-semibold text-[#111315]"
              >
                Contact & Support
              </a>
            </div>

            <div className="pt-2 flex items-center justify-between text-token-14 text-[#47515A]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="flex items-center gap-2 py-2 text-[#111315] font-medium"
              >
                <User className="w-5 h-5 text-[#01B1EE]" />
                <span>My Account / Login</span>
              </button>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 px-4 bg-[#01B1EE] hover:bg-[#00A2D9] text-[#111315] font-semibold text-token-16 rounded-lg text-center flex items-center justify-center gap-2"
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
