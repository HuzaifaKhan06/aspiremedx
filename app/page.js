import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import TechIntegrations from "@/components/TechIntegrations";
import ProcessLoop from "@/components/ProcessLoop";
import WhyUs from "@/components/WhyUs";
import Testimonial from "@/components/Testimonial";
import SiteFaqs from "@/components/SiteFaqs";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <TechIntegrations />
        <ProcessLoop />
        <WhyUs />
        <Testimonial />
        <SiteFaqs />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
