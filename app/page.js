import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import ProcessLoop from "@/components/ProcessLoop";
import WhyUs from "@/components/WhyUs";
import Testimonial from "@/components/Testimonial";
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
        <ProcessLoop />
        <WhyUs />
        <Testimonial />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
