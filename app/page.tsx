'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { VideoHero } from '@/components/VideoHero';
import { PromoCarousel } from '@/components/PromoCarousel';
import { ShopByCategory } from '@/components/ShopByCategory';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { HairTransformation } from '@/components/HairTransformation';
import { ServicesSection } from '@/components/ServicesSection';
import { ConsultationCTA } from '@/components/ConsultationCTA';
import { CustomerReviews } from '@/components/CustomerReviews';
import { CentresSection } from '@/components/CentresSection';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { CartDrawer, CartItem } from '@/components/CartDrawer';
import { AccountModal } from '@/components/AccountModal';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Smooth scroll listener for navbar transparent -> solid transition
  useEffect(() => {
    const handleScroll = () => {
      // Transition when scrolled beyond initial hero banner top zone (80px)
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.variant === item.variant
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.variant === item.variant
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111315] selection:bg-[#EAF8FE] selection:text-[#006F96] flex flex-col font-body">
      {/* Section 1: Header and Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        onOpenConsultation={() => scrollToAnchor('consultation')}
        isScrolled={isScrolled}
      />

      <main className="flex-1">
        {/* Section 2: Cinematic Video Hero */}
        <VideoHero
          onExploreProducts={() => scrollToAnchor('categories')}
          onBookAppointment={() => scrollToAnchor('consultation')}
        />

        {/* Section 3: Promotional Banner Carousel */}
        <PromoCarousel
          onSelectCollection={(category) => {
            if (category === 'services') {
              scrollToAnchor('services');
            } else {
              scrollToAnchor('categories');
            }
          }}
        />

        {/* Section 4: Shop By Category */}
        <ShopByCategory
          onSelectCategory={() => {
            scrollToAnchor('featured-products');
          }}
          onOpenConsultation={() => scrollToAnchor('consultation')}
        />

        {/* Section 5: Featured Products (Conditional - Real Catalog Units) */}
        <FeaturedProducts
          onAddToCart={handleAddToCart}
          onOpenConsultation={() => scrollToAnchor('consultation')}
        />

        {/* Section 5.5: Hair Transformation - Interactive Before & After Showcase */}
        <HairTransformation />

        {/* Section 6: Our Services + Integrated #about Area */}
        <ServicesSection
          onBookService={() => scrollToAnchor('consultation')}
        />

        {/* Section 7: Customer Reviews & Testimonials */}
        <CustomerReviews
          onOpenConsultation={() => scrollToAnchor('consultation')}
        />

        {/* Section 8: Consultation CTA */}
        <ConsultationCTA
          onOpenConsultationModal={() => scrollToAnchor('consultation')}
        />

        {/* Section 9: Our Centres / Branches */}
        <CentresSection
          onBookAtCentre={() => scrollToAnchor('consultation')}
        />

        {/* Section 11: FAQs */}
        <FaqSection
          onOpenConsultation={() => scrollToAnchor('consultation')}
        />
      </main>

      {/* Section 12: Footer */}
      <Footer
        onOpenConsultation={() => scrollToAnchor('consultation')}
        onOpenAccount={() => setAccountOpen(true)}
      />

      {/* Illustrative Overlays / Drawers */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onBrowseProducts={() => scrollToAnchor('featured-products')}
      />

      <AccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
      />
    </div>
  );
}
