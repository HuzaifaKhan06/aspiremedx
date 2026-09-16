import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CollaborateWith from "@/components/CollaborateWith";
import WhoWeAre from "@/components/WhoWeAre";
import WhatMakesDifferent from "@/components/WhatMakesDifferent";
import ServicesCarousel from "@/components/ServicesCarousel";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import WhyTrust from "@/components/WhyTrust";
import SiteFaqs from "@/components/SiteFaqs";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CollaborateWith />
        <WhoWeAre />
        <WhatMakesDifferent />
        <ServicesCarousel />
        <SpecialtiesSection />
        <WhyTrust />
        <SiteFaqs />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
