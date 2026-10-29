'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShoppingCart, Check } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface FeaturedProductsProps {
  onAddToCart: (item: CartItem) => void;
  onOpenConsultation?: () => void;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  imageAlt: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'mens-hair-patch',
    name: "Men's Hair Patch",
    category: 'Hair Patch',
    price: 8999,
    originalPrice: 12999,
    discount: '30% OFF',
    image: '/images/products/mens-hair-patch.png',
    imageAlt: "Natural-looking Men's Hair Patch with breathable skin base and undetectable hairline",
  },
  {
    id: 'premium-womens-wig',
    name: "Premium Women's Wig",
    category: 'Wig',
    price: 15499,
    originalPrice: 18999,
    discount: '18% OFF',
    image: '/images/products/premium-womens-wig.png',
    imageAlt: "Premium Women's custom human hair lace front wig with natural volume",
  },
  {
    id: 'hair-extensions',
    name: 'Hair Extensions',
    category: 'Hair Extension',
    price: 6999,
    originalPrice: 9499,
    discount: '26% OFF',
    image: '/images/products/hair-extensions.png',
    imageAlt: 'Seamless Remy human hair extensions and tape-in volumizers',
  },
  {
    id: 'hair-system',
    name: 'Hair System',
    category: 'Hair System',
    price: 11999,
    originalPrice: 16999,
    discount: '29% OFF',
    image: '/images/products/hair-system.png',
    imageAlt: 'Ultra-thin polymer and monofilament breathable non-surgical hair system',
  },
  {
    id: 'hair-loss-solution',
    name: 'Anti-Hair Loss Scalp Therapy Set',
    category: 'Hair Loss Solution',
    price: 4499,
    originalPrice: 5999,
    discount: '25% OFF',
    image: '/images/categories/hair-loss.png',
    imageAlt: 'Targeted scalp care serum and natural hair follicle density therapy set',
  },
  {
    id: 'hair-care-kit',
    name: 'Hair System Care & Adhesive Kit',
    category: 'Hair Accessories',
    price: 2499,
    originalPrice: 3499,
    discount: '28% OFF',
    image: '/images/categories/accessories.png',
    imageAlt: 'Specialized waterproof tapes, solvent remover, and maintenance accessories',
  },
  {
    id: 'french-lace-patch',
    name: 'Ultra-Thin French Lace Hair Patch',
    category: 'Hair Patch',
    price: 9999,
    originalPrice: 13999,
    discount: '28% OFF',
    image: '/images/categories/hair-patches.png',
    imageAlt: 'Ultra-breathable French lace front non-surgical custom hair patch',
  },
  {
    id: 'monofilament-wig',
    name: 'Natural Monofilament Full Wig',
    category: 'Wig',
    price: 17999,
    originalPrice: 22499,
    discount: '20% OFF',
    image: '/images/categories/wigs.png',
    imageAlt: 'Feather-light monofilament hand-tied human hair natural wig',
  },
];

export function FeaturedProducts({ onAddToCart }: FeaturedProductsProps) {
  const [addedId, setAddedId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(4);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(PRODUCTS.length / cardsPerView);
  }, [cardsPerView]);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth } = el;
    if (clientWidth > 0) {
      const page = Math.round(scrollLeft / clientWidth);
      setCurrentPage(Math.min(page, Math.max(0, totalPages - 1)));
    }
  }, [totalPages]);

  useEffect(() => {
    checkScroll();
  }, [checkScroll, cardsPerView]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const clientWidth = el.clientWidth;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - clientWidth;

    if (direction === 'left') {
      if (scrollLeft <= 15) {
        // Wrap to the last page
        el.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -clientWidth, behavior: 'smooth' });
      }
    } else {
      if (scrollLeft >= maxScroll - 15) {
        // Wrap to the first page
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: clientWidth, behavior: 'smooth' });
      }
    }
  };

  const goToPage = (pageIdx: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTo({ left: pageIdx * el.clientWidth, behavior: 'smooth' });
    setCurrentPage(pageIdx);
  };

  const handleAdd = (product: Product) => {
    onAddToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: 1,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="featured-products" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <p className="text-[#01B1EE] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3 font-body">
            FEATURED PRODUCTS
          </p>

          {/* Heading in DM Serif Display */}
          <h2 className="type-section-heading text-[#111315]">
            Best Picks for <span className="text-[#01B1EE]">Natural Confidence</span>
          </h2>

          {/* Short Supporting Description in Manrope */}
          <p className="mt-3 text-token-16 text-[#697780] max-w-2xl font-body">
            Explore our most popular hair solutions, trusted for quality, comfort, and style.
          </p>
        </div>

        {/* Carousel Frame with Outside Left/Right Circular Arrow Controls */}
        <div className="relative">
          {/* Scrollable Products Carousel Row */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)] shrink-0 snap-start bg-white rounded-2xl border border-[#E1E7EB] shadow-xs hover:border-[#01B1EE]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Product Image Area */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#F7FAFC] rounded-t-2xl">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    width={358}
                    height={353}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                {/* Product Information Area */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    {/* Category Label */}
                    <span className="text-token-12 font-medium text-[#006F96] tracking-wide mb-1 block">
                      {product.category}
                    </span>

                    {/* Product Name */}
                    <h3 className="text-token-16 md:text-token-18 font-semibold text-[#111315] line-clamp-1 mb-2 font-body">
                      {product.name}
                    </h3>

                    {/* Price Row: Current Price, Original Price with Strikethrough, Discount Badge */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <span className="text-token-18 md:text-token-20 font-bold text-[#111315] tabular-nums font-body">
                        ₹ {product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-token-14 text-[#697780] line-through tabular-nums font-body">
                        ₹ {product.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="bg-[#D1F7E8] text-[#0A7B55] text-token-12 font-bold px-2.5 py-0.5 rounded-md font-body">
                        {product.discount}
                      </span>
                    </div>
                  </div>

                  {/* Dark Add to Cart Button */}
                  <button
                    type="button"
                    onClick={() => handleAdd(product)}
                    className="w-full py-3 bg-[#15191E] hover:bg-[#000000] text-white font-semibold text-token-14 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.98] font-body"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    {addedId === product.id ? (
                      <>
                        <Check className="w-4 h-4 text-[#01B1EE]" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow Button (Circular white, outside the row) */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Previous products"
            className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-5 lg:-left-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#111315] border border-[#E1E7EB] shadow-md hover:bg-[#EAF8FE] hover:border-[#01B1EE] hover:text-[#006F96] flex items-center justify-center transition-all active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#01B1EE]"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button (Circular white, outside the row) */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Next products"
            className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-5 lg:-right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#111315] border border-[#E1E7EB] shadow-md hover:bg-[#EAF8FE] hover:border-[#01B1EE] hover:text-[#006F96] flex items-center justify-center transition-all active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#01B1EE]"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Standardized Pagination Indicators: 8px Grey Dots & 28px Cyan Pill */}
        {totalPages > 1 && (
          <div
            className="mt-8 sm:mt-10 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Product carousel pagination"
          >
            {[...Array(totalPages)].map((_, pageIdx) => (
              <button
                key={pageIdx}
                type="button"
                onClick={() => goToPage(pageIdx)}
                aria-label={`Go to product slide ${pageIdx + 1}`}
                aria-selected={currentPage === pageIdx}
                role="tab"
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#01B1EE] ${
                  currentPage === pageIdx
                    ? 'w-7 bg-[#01B1EE]'
                    : 'w-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
