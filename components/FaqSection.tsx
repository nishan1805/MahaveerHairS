'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqSectionProps {
  onOpenConsultation?: () => void;
}

export function FaqSection({}: FaqSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is the difference between a hair patch (hair system) and a wig?',
      answer:
        'A hair patch (also known as a hair system or toupee) is designed to cover specific localized thinning or balding areas—most commonly the top crown and frontal hairline. It is custom-cut and bonded directly to the scalp with medical-grade adhesives or clips, integrating invisibly with your surrounding natural hair. A wig, in contrast, provides complete 360-degree scalp coverage and can be slipped on or off daily.',
    },
    {
      question: 'Can I shower, swim, work out, and sleep with a hair patch attached?',
      answer:
        'Yes. When attached using professional medical-grade liquid adhesives or waterproof tapes during a salon sitting, the hair system remains firmly secured through intense workouts, swimming, daily shampooing, and sleep. The micro-porous lace base allows natural perspiration and scalp breathing.',
    },
    {
      question: 'How long does a hair system last and how frequently is servicing needed?',
      answer:
        'With proper daily maintenance and gentle sulfate-free care, a high-grade 100% human hair system typically lasts between 8 to 14 months depending on base delicate-ness (ultra-thin skin vs. monofilament). Routine servicing (cleansing, scalp hygiene, and re-taping) is recommended every 3 to 4 weeks at our studio.',
    },
    {
      question: 'What happens during my first consultation at the Raipur centre?',
      answer:
        'Your initial consultation is held in a private, confidential styling suite. A specialist measures your scalp circumference, inspects hair curl pattern and density, matches color swatches to your biological hair, and explains the differences between skin bases, lace fronts, and clip-in attachments. There is zero pressure and zero surgery.',
    },
    {
      question: 'Are Mahaveer hair products made with 100% natural human hair?',
      answer:
        'Yes, all our hair systems, lace front wigs, and volumizing extensions are constructed from 100% genuine Remy human hair with intact cuticles. This allows you to comb, part in any direction, blow-dry, and style them just like your biological hair.',
    },
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-[#01B1EE] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3 font-body">
            GOT QUESTIONS?
          </p>
          <h2 className="type-section-heading text-[#111315]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-token-16 text-[#697780] font-body">
            Learn more about choosing a suitable hair solution, visiting our centre, and daily care.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[#E1E7EB] bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#F7FAFC] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-token-16 md:text-token-18 font-bold text-[#111315]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#F7FAFC] border border-[#E1E7EB] flex items-center justify-center shrink-0 text-[#111315] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#EAF8FE] text-[#01B1EE] border-[#01B1EE]/30' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-token-14 md:text-token-16 text-[#47515A] leading-relaxed border-t border-[#E1E7EB]/50 bg-[#F7FAFC]/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
