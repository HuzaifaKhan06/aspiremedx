import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutValues from "@/components/about/AboutValues";
import AboutStats from "@/components/about/AboutStats";
import AboutWhy from "@/components/about/AboutWhy";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "About Us | AspireMedX",
  description:
    "Learn about AspireMedX — our mission, values, and the team dedicated to transforming revenue cycle management for healthcare organizations.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutMission />
        <AboutStats />
        <AboutValues />
        <AboutWhy />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
