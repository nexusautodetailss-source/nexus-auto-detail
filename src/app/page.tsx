import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Team from "@/components/Team";
import Services from "@/components/Services";
import WashReveal from "@/components/WashReveal";
import Gallery from "@/components/Gallery";
import Packages from "@/components/Packages";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Team />
      <Services />
      <WashReveal />
      <Gallery />
      <Packages />
      <Booking />
      <Footer />
    </main>
  );
}
