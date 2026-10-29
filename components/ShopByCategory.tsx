'use client';

import React from 'react';
import Image from 'next/image';

interface ShopByCategoryProps {
  onSelectCategory: (categoryKey: string) => void;
  onOpenConsultation: () => void;
}

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  isConsultationTarget?: boolean;
}

export function ShopByCategory({ onSelectCategory, onOpenConsultation }: ShopByCategoryProps) {
  const categories: CategoryItem[] = [
    {
      id: 'wigs',
      name: 'Wigs',
      image: '/images/categories/wigs.png',
      imageAlt: 'Custom men and women natural-looking wigs collection',
    },
    {
      id: 'hair-patches',
      name: 'Hair Patches / Hair Systems',
      image: '/images/categories/hair-patches.png',
      imageAlt: 'Non-surgical hair patches and breathable hair systems',
    },
    {
      id: 'extensions',
      name: 'Hair Extensions',
      image: '/images/categories/extensions.png',
      imageAlt: 'Premium Remy human hair extensions and toppers',
    },
    {
      id: 'hair-loss',
      name: 'Hair Loss Solution',
      image: '/images/categories/hair-loss.png',
      imageAlt: 'Personalised hair loss consultations and non-surgical scalp restoration',
      isConsultationTarget: true,
    },
    {
      id: 'accessories',
      name: 'Hair Accessories',
      image: '/images/categories/accessories.png',
      imageAlt: 'Specialised hair care combs, clips, care sprays and maintenance accessories',
    },
  ];

  const handleCategoryClick = (cat: CategoryItem) => {
    if (cat.isConsultationTarget) {
      onOpenConsultation();
    } else {
      onSelectCategory(cat.id);
    }
  };

  return (
    <section id="categories" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <p className="text-[#01B1EE] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3 font-body">
            SHOP BY CATEGORY
          </p>

          {/* Section Heading: DM Serif Display */}
          <h2 className="type-section-heading text-[#111315]">
            Find Your Perfect <span className="text-[#01B1EE]">Hair Solution</span>
          </h2>
        </div>

        {/* Categories Row: 5 Large Circular Images with Clean Labels */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-6 justify-items-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className="group flex flex-col items-center text-center cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#01B1EE] rounded-2xl p-2 transition-transform duration-300"
            >
              {/* Circular Image Container */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-48 lg:h-48 xl:w-52 xl:h-52 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={cat.image}
                  alt={cat.imageAlt}
                  width={350}
                  height={350}
                  className="w-full h-full object-contain drop-shadow-2xs"
                  priority
                />
              </div>

              {/* Category Name Label Below Image: single-line on desktop */}
              <div className="text-sm sm:text-base lg:text-[15px] xl:text-base font-semibold text-[#111315] group-hover:text-[#01B1EE] transition-colors leading-snug whitespace-normal lg:whitespace-nowrap px-1">
                {cat.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
