import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpecialityCard from "@/components/SpecialityCard";
import { specialities } from "@/lib/content";

export const metadata = {
  title: "Speciality Billing Services | AspireMedX",
  description:
    "Speciality medical billing services from AspireMedX — DME, pharmacy, mental health, ER, ASC, and radiology billing.",
};

export default function SpecialityPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-bg)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-teal)]">
            Speciality billing
          </p>
          <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
            Billing rules change by speciality. So does our approach.
          </h1>
          <p className="mt-4 max-w-xl text-[var(--color-muted)]">
            Each speciality below runs on its own coding rules, payer quirks,
            and denial patterns. Pick yours to see how AspireMedX handles it.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specialities.map((item) => (
              <SpecialityCard key={item.slug} speciality={item} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
