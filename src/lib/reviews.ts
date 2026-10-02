// Reseñas de Google del perfil de Nexus (Places API, se consulta en el servidor y se
// refresca una vez al día). Requiere en Vercel: GOOGLE_PLACES_API_KEY y GOOGLE_PLACE_ID.

export interface Review {
  author: string;
  photo: string | null;
  rating: number;
  text: string;
  when: string;          // "hace 2 semanas"
  url: string | null;
}

export interface ReviewsData {
  rating: number;
  total: number;
  mapsUrl: string;
  writeUrl: string;
  reviews: Review[];
}

interface PlaceReview {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
}

// Solo para ver el diseño en la computadora (REVIEWS_DEMO=1). Nunca se usa en producción.
const DEMO: ReviewsData = {
  rating: 5, total: 3, mapsUrl: "https://www.google.com/maps", writeUrl: "https://www.google.com/maps",
  reviews: [1, 2, 3].map((n) => ({
    author: `Cliente de ejemplo ${n}`, photo: null, rating: 5, when: "Vista previa",
    text: "Aquí aparecerá el comentario real de un cliente desde Google. Esta tarjeta es solo una vista previa del diseño y no se publica.",
    url: null,
  })),
};

export async function getReviews(): Promise<ReviewsData | null> {
  if (process.env.REVIEWS_DEMO === "1" && process.env.NODE_ENV !== "production") return DEMO;
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;
  try {
    const r = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri" },
      next: { revalidate: 86400 },
    });
    if (!r.ok) return null;
    const d = await r.json();
    const reviews: Review[] = ((d.reviews ?? []) as PlaceReview[])
      .filter((x) => (x.rating ?? 0) >= 4 && (x.originalText?.text || x.text?.text))
      .map((x) => ({
        author: x.authorAttribution?.displayName ?? "Google",
        photo: x.authorAttribution?.photoUri ?? null,
        rating: x.rating ?? 5,
        text: x.originalText?.text ?? x.text?.text ?? "",
        when: x.relativePublishTimeDescription ?? "",
        url: x.authorAttribution?.uri ?? null,
      }));
    return {
      rating: d.rating ?? 5,
      total: d.userRatingCount ?? reviews.length,
      mapsUrl: d.googleMapsUri ?? `https://www.google.com/maps/place/?q=place_id:${placeId}`,
      writeUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
      reviews,
    };
  } catch {
    return null;
  }
}
