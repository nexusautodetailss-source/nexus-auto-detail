import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Team from "@/components/Team";
import Services from "@/components/Services";
import GoogleReviews from "@/components/GoogleReviews";
import { getReviews } from "@/lib/reviews";
import Gallery from "@/components/Gallery";
import AppPromo from "@/components/AppPromo";
import AppPopup from "@/components/AppPopup";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import fallbackCatalog from "@/data/catalog-fallback.json";

const API = "https://nexus-core-production-943c.up.railway.app";

type Catalog = { services: { name: { en: string; es: string } }[] };

/** Precios y servicios desde el mismo catálogo de la app y el agente de voz.
 *  Se refresca cada 10 minutos; si el servidor no responde, usa la copia local. */
async function getCatalog(): Promise<Catalog> {
  try {
    const r = await fetch(`${API}/catalog`, { next: { revalidate: 600 } });
    if (r.ok) return (await r.json()) as Catalog;
  } catch {}
  return fallbackCatalog as unknown as Catalog;
}

export default async function Home() {
  const [catalog, reviews] = await Promise.all([getCatalog(), getReviews()]);
  return (
    <main>
      <Hero />
      <Marquee />
      <Team />
      <Services />
      <AppPromo />
      <Booking services={catalog.services.map((s) => s.name)} />
      <Gallery />
      <GoogleReviews data={reviews} />
      <Footer />
      <AppPopup />
    </main>
  );
}
