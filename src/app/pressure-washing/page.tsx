import PressureWashing from "@/components/PressureWashing";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pressure Washing | Nexus Auto Detail — Lawrenceville, GA",
  description: "Professional pressure washing services: house washing, driveways, patios, sidewalks, parking lots, fences & more. Mobile service up to 40 miles from Lawrenceville, GA.",
};

export default function PressureWashingPage() {
  return (
    <main>
      <PressureWashing />
      <Footer />
    </main>
  );
}
