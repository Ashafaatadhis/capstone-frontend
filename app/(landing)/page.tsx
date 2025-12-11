import Navbar from "./components/navbar";
import Hero from "./components/hero";
import WhyUs from "./components/why-us";
import HowItWorks from "./components/how-it-works";
import Cta from "./components/cta";
import Footer from "./components/footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.16),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(56,189,248,0.12),transparent_35%)]" />
      <div className="relative pt-16">
        <Navbar />
        <Hero />
        <WhyUs />
        <HowItWorks />
        <Cta />
        <Footer />
      </div>
    </div>
  );
}
