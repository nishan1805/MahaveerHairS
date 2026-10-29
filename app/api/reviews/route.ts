import { NextResponse } from 'next/server';

export interface NormalizedGoogleReview {
  id: string;
  authorName: string;
  authorPhotoUrl: string | null;
  authorUri?: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime?: string | null;
  googleMapsUrl?: string;
}

export interface ReviewsApiResponse {
  reviews: NormalizedGoogleReview[];
  placeName?: string | null;
  rating?: number | null;
  userRatingsTotal?: number | null;
  googleMapsUrl?: string | null;
  status: 'ok' | 'empty' | 'unavailable';
  message?: string;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json<ReviewsApiResponse>(
      {
        reviews: [],
        placeName: null,
        rating: null,
        userRatingsTotal: null,
        googleMapsUrl: null,
        status: 'unavailable',
        message: 'Google Places reviews are currently unavailable.',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  }

  try {
    // 1. Try Google Places API (New) across multiple languages to retrieve all available genuine reviews
    const languages = ['en', 'hi', 'mr', 'gu', 'bn', 'te'];
    const fetchPromises = languages.map(async (lang) => {
      const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${lang}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask':
            'id,displayName,rating,userRatingCount,reviews,googleMapsUri',
        },
        next: { revalidate: 3600 }, // 1-hour cache adhering to Google guidelines
      });
      if (!res.ok) return null;
      return res.json();
    });

    const results = await Promise.allSettled(fetchPromises);
    const seenIds = new Set<string>();
    const allUniqueReviews: NormalizedGoogleReview[] = [];
    let placeDisplayName: string | null = null;
    let placeRating: number | null = null;
    let placeUserRatingCount: number | null = null;
    let placeMapsUri: string | null = null;

    for (const res of results) {
      if (res.status === 'fulfilled' && res.value) {
        const data = res.value;
        if (!placeDisplayName && data.displayName?.text) {
          placeDisplayName = data.displayName.text;
        }
        if (placeRating === null && typeof data.rating === 'number') {
          placeRating = data.rating;
        }
        if (placeUserRatingCount === null && typeof data.userRatingCount === 'number') {
          placeUserRatingCount = data.userRatingCount;
        }
        if (!placeMapsUri && data.googleMapsUri) {
          placeMapsUri = data.googleMapsUri;
        }

        const rawReviews = Array.isArray(data.reviews) ? data.reviews : [];
        for (const rev of rawReviews) {
          const revId = rev.name || rev.authorAttribution?.displayName || Math.random().toString();
          if (!seenIds.has(revId)) {
            seenIds.add(revId);
            const textContent = (rev.text?.text || rev.originalText?.text || '').trim();
            allUniqueReviews.push({
              id: rev.name || `review-${allUniqueReviews.length}`,
              authorName: rev.authorAttribution?.displayName || 'Google Reviewer',
              authorPhotoUrl: rev.authorAttribution?.photoUri || null,
              authorUri: rev.authorAttribution?.uri || null,
              rating: typeof rev.rating === 'number' ? rev.rating : 5,
              text: textContent,
              relativeTime:
                rev.relativePublishTimeDescription || 'Verified Google Review',
              publishTime: rev.publishTime || null,
              googleMapsUrl:
                placeMapsUri ||
                data.googleMapsUri ||
                `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`,
            });
          }
        }
      }
    }

    if (allUniqueReviews.length > 0) {
      return NextResponse.json<ReviewsApiResponse>(
        {
          reviews: allUniqueReviews,
          placeName: placeDisplayName,
          rating: placeRating,
          userRatingsTotal: placeUserRatingCount,
          googleMapsUrl:
            placeMapsUri ||
            `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`,
          status: 'ok',
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
          },
        }
      );
    }

    // 2. Fallback to Legacy Google Places Details API
    const legacyUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&fields=name,rating,reviews,url,user_ratings_total&key=${encodeURIComponent(apiKey)}`;

    const legacyRes = await fetch(legacyUrl, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (legacyRes.ok) {
      const legacyData = await legacyRes.json();
      const rawReviews = Array.isArray(legacyData.result?.reviews)
        ? legacyData.result.reviews
        : [];

      if (rawReviews.length > 0) {
        const reviews: NormalizedGoogleReview[] = rawReviews
          .slice(0, 15)
          .map((rev: any, idx: number) => ({
            id: `legacy-${idx}-${rev.time || idx}`,
            authorName: rev.author_name || 'Google Reviewer',
            authorPhotoUrl: rev.profile_photo_url || null,
            authorUri: rev.author_url || null,
            rating: typeof rev.rating === 'number' ? rev.rating : 5,
            text: (rev.text || '').trim(),
            relativeTime: rev.relative_time_description || 'Verified Google Review',
            googleMapsUrl:
              legacyData.result?.url ||
              `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`,
          }));

        return NextResponse.json<ReviewsApiResponse>(
          {
            reviews,
            placeName: legacyData.result?.name || null,
            rating:
              typeof legacyData.result?.rating === 'number'
                ? legacyData.result.rating
                : null,
            userRatingsTotal:
              typeof legacyData.result?.user_ratings_total === 'number'
                ? legacyData.result.user_ratings_total
                : null,
            googleMapsUrl:
              legacyData.result?.url ||
              `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`,
            status: 'ok',
          },
          {
            status: 200,
            headers: {
              'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
            },
          }
        );
      }
    }

    // If both return 0 reviews or empty
    return NextResponse.json<ReviewsApiResponse>(
      {
        reviews: [],
        placeName: null,
        rating: null,
        userRatingsTotal: null,
        googleMapsUrl: `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`,
        status: 'empty',
        message: 'No customer reviews currently available.',
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // Unobtrusive, safe error handling without crashing or exposing keys
    return NextResponse.json<ReviewsApiResponse>(
      {
        reviews: [],
        placeName: null,
        rating: null,
        userRatingsTotal: null,
        googleMapsUrl: null,
        status: 'unavailable',
        message: 'Customer reviews are currently unavailable.',
      },
      {
        status: 200,
      }
    );
  }
}
