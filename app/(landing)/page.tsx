import Navbar from "./components/navbar";
import Hero from "./components/hero";
import WhyUs from "./components/why-us";
import HowItWorks from "./components/how-it-works";
import Footer from "./components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <Hero />
      <WhyUs />
      <HowItWorks />
      <Footer />
    </div>
  );
}
