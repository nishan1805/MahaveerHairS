'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import type { NormalizedGoogleReview, ReviewsApiResponse } from '@/app/api/reviews/route';

interface CustomerReviewsProps {
  onOpenConsultation?: () => void;
}

// Minimal Google "G" multi-color logo for authentic attribution
function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export function CustomerReviews({}: CustomerReviewsProps) {
  const [reviews, setReviews] = useState<NormalizedGoogleReview[]>([]);
  const [placeInfo, setPlaceInfo] = useState<{
    placeName?: string | null;
    rating?: number | null;
    userRatingsTotal?: number | null;
    googleMapsUrl?: string | null;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carousel & responsive pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Fetch reviews from server endpoint
  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/reviews', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to load reviews');
        }

        const data: ReviewsApiResponse = await res.json();
        if (isMounted) {
          if (data.reviews && data.reviews.length > 0) {
            const fiveStarReviews = data.reviews.filter((r) => r.rating === 5);
            setReviews(fiveStarReviews);
          } else {
            setReviews([]);
          }
          setPlaceInfo({
            placeName: data.placeName,
            rating: data.rating,
            userRatingsTotal: data.userRatingsTotal,
            googleMapsUrl: data.googleMapsUrl,
          });
        }
      } catch (err) {
        if (isMounted) {
          setError('Customer reviews are currently unavailable.');
          setReviews([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  // Update cards per page based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerPage(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (reviews.length === 0) return 1;
    return Math.ceil(reviews.length / cardsPerPage);
  }, [reviews.length, cardsPerPage]);

  // Derive safe current page without cascading renders
  const safeCurrentPage = Math.min(currentPage, Math.max(0, totalPages - 1));

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => {
      const current = Math.min(prev, Math.max(0, totalPages - 1));
      return (current + 1) % totalPages;
    });
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => {
      const current = Math.min(prev, Math.max(0, totalPages - 1));
      return (current - 1 + totalPages) % totalPages;
    });
  }, [totalPages]);

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (totalPages <= 1) return;
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Slice visible reviews for current page
  const visibleReviews = useMemo(() => {
    const start = safeCurrentPage * cardsPerPage;
    return reviews.slice(start, start + cardsPerPage);
  }, [reviews, safeCurrentPage, cardsPerPage]);

  return (
    <section
      id="reviews"
      aria-label="Customer Reviews"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="py-12 sm:py-16 md:py-20 bg-white focus:outline-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <p className="text-[#01B1EE] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3 font-body">
              VERIFIED EXPERIENCES
            </p>

            {/* Heading in DM Serif Display */}
            <h2 className="type-section-heading text-[#111315]">
              Customer Reviews &amp; Experiences
            </h2>

            {/* Short Supporting Description in Manrope */}
            <p className="mt-3 text-token-16 text-[#697780] font-body">
              Read real feedback and ratings from our customers.
            </p>
          </div>

          {/* Aggregate Rating / Google Badge & Top Controls */}
          {placeInfo.rating && (
            <div className="flex items-center gap-4 self-start md:self-auto bg-[#F7FAFC] border border-[#E1E7EB] rounded-2xl px-4 py-2.5">
              <GoogleIcon className="w-5 h-5 shrink-0" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-token-16 font-bold text-[#111315]">
                    {placeInfo.rating.toFixed(1)}
                  </span>
                  <div className="flex items-center text-[#FBBC04]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.round(placeInfo.rating || 5)
                            ? 'fill-current'
                            : 'text-[#D1D5DB]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {placeInfo.userRatingsTotal && (
                  <span className="text-token-12 text-[#697780]">
                    Based on {placeInfo.userRatingsTotal} Google reviews
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Loading State: Skeleton Cards */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((skeletonIdx) => (
              <div
                key={skeletonIdx}
                className="p-6 md:p-8 rounded-2xl border border-[#E1E7EB] bg-white animate-pulse flex flex-col justify-between h-72"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="w-4 h-4 bg-slate-200 rounded-sm" />
                      ))}
                    </div>
                    <div className="w-16 h-4 bg-slate-100 rounded" />
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="w-full h-3.5 bg-slate-200 rounded" />
                    <div className="w-5/6 h-3.5 bg-slate-200 rounded" />
                    <div className="w-3/4 h-3.5 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="pt-4 border-t border-[#E1E7EB] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div className="space-y-1">
                    <div className="w-24 h-3.5 bg-slate-200 rounded" />
                    <div className="w-16 h-3 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty or Error State (Without Fake Testimonials) */}
        {!loading && (error || reviews.length === 0) && (
          <div className="bg-[#F7FAFC] rounded-2xl border border-[#E1E7EB] p-10 md:p-14 text-center max-w-2xl mx-auto my-6">
            <div className="w-12 h-12 rounded-full bg-white border border-[#E1E7EB] flex items-center justify-center mx-auto mb-4 shadow-2xs">
              <GoogleIcon className="w-6 h-6" />
            </div>
            <h3 className="text-token-18 font-bold text-[#111315] mb-2 font-body">
              Customer Reviews
            </h3>
            <p className="text-token-15 text-[#697780] max-w-md mx-auto leading-relaxed">
              {error || 'Customer reviews are currently unavailable.'}
            </p>
            {placeInfo.googleMapsUrl && (
              <div className="mt-6">
                <a
                  href={placeInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-[#E1E7EB] hover:border-[#01B1EE] rounded-xl text-token-14 font-semibold text-[#111315] transition-all shadow-2xs"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#01B1EE]" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Carousel Content */}
        {!loading && reviews.length > 0 && (
          <div className="relative">
            {/* Side Navigation Buttons (outside cards, vertically centered with card container) */}
            {totalPages > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous reviews"
                  className="absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#EAF8FE] text-[#111315] hover:text-[#01B1EE] border border-[#E1E7EB] hover:border-[#01B1EE] shadow-md hover:shadow-lg flex items-center justify-center transition-all active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#01B1EE]"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next reviews"
                  className="absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#EAF8FE] text-[#111315] hover:text-[#01B1EE] border border-[#E1E7EB] hover:border-[#01B1EE] shadow-md hover:shadow-lg flex items-center justify-center transition-all active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#01B1EE]"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            {/* Reviews Grid for Current Page */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {visibleReviews.map((rev) => {
                const isExpanded = !!expandedReviews[rev.id];
                const textLength = rev.text.length;
                const isLongText = textLength > 170;
                const displayText =
                  isLongText && !isExpanded
                    ? `${rev.text.slice(0, 165)}...`
                    : rev.text;
                const hasImage = !!rev.authorPhotoUrl && !imageErrors[rev.id];
                const initial = (rev.authorName || 'G').charAt(0).toUpperCase();

                return (
                  <div
                    key={rev.id}
                    className="p-6 md:p-7 rounded-2xl border border-[#E1E7EB] bg-white hover:border-[#01B1EE]/40 hover:shadow-xs transition-all duration-200 flex flex-col justify-between h-full min-h-[270px]"
                  >
                    <div>
                      {/* 1. Reviewer Details (Top) */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Avatar */}
                          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#EAF8FE] border border-[#E1E7EB] shrink-0 flex items-center justify-center text-[#006F96] font-bold text-token-14">
                            {hasImage ? (
                              <Image
                                src={rev.authorPhotoUrl!}
                                alt={rev.authorName}
                                fill
                                sizes="40px"
                                className="object-cover"
                                referrerPolicy="no-referrer"
                                onError={() => handleImageError(rev.id)}
                              />
                            ) : (
                              <span>{initial}</span>
                            )}
                          </div>

                          {/* Name and Relative Date */}
                          <div className="min-w-0">
                            {rev.authorUri ? (
                              <a
                                href={rev.authorUri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-token-14 font-bold text-[#111315] hover:text-[#006F96] truncate block transition-colors"
                              >
                                {rev.authorName}
                              </a>
                            ) : (
                              <h4 className="text-token-14 font-bold text-[#111315] truncate">
                                {rev.authorName}
                              </h4>
                            )}
                            <p className="text-token-12 text-[#697780] truncate">
                              {rev.relativeTime}
                            </p>
                          </div>
                        </div>

                        {/* Google Logo / Icon */}
                        {rev.googleMapsUrl ? (
                          <a
                            href={rev.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View review by ${rev.authorName} on Google`}
                            className="shrink-0 p-1.5 hover:opacity-80 transition-opacity"
                          >
                            <GoogleIcon className="w-4 h-4" />
                          </a>
                        ) : (
                          <div className="shrink-0 p-1.5">
                            <GoogleIcon className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      {/* 2. Star Rating */}
                      <div
                        className="flex items-center gap-1 text-[#FBBC04] mb-3"
                        aria-label={`${rev.rating} out of 5 stars`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rev.rating
                                ? 'fill-current'
                                : 'text-[#E1E7EB]'
                            }`}
                          />
                        ))}
                      </div>

                      {/* 3. Review Text */}
                      {rev.text ? (
                        <div className="text-token-14 md:text-token-15 text-[#333D44] leading-relaxed">
                          <p>&ldquo;{displayText}&rdquo;</p>
                          {isLongText && (
                            <button
                              type="button"
                              onClick={() => toggleExpand(rev.id)}
                              className="mt-2 text-token-12 font-bold text-[#006F96] hover:text-[#01B1EE] transition-colors cursor-pointer inline-flex items-center"
                            >
                              {isExpanded ? 'Show less' : 'Read more'}
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className="text-token-14 text-[#697780] italic">
                          Rating left on Google without written text.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Standardized Pagination Indicators: 8px Grey Dots & 28px Cyan Pill */}
            {totalPages > 1 && (
              <div
                className="mt-8 sm:mt-10 flex items-center justify-center gap-2"
                role="tablist"
                aria-label="Reviews pagination"
              >
                {[...Array(totalPages)].map((_, pageIdx) => (
                  <button
                    key={pageIdx}
                    type="button"
                    onClick={() => setCurrentPage(pageIdx)}
                    aria-label={`Go to reviews page ${pageIdx + 1}`}
                    aria-selected={safeCurrentPage === pageIdx}
                    role="tab"
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#01B1EE] ${
                      safeCurrentPage === pageIdx
                        ? 'w-7 bg-[#01B1EE]'
                        : 'w-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
