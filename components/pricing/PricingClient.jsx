"use client";

import { useCallback, useRef, useState } from "react";
import { pricingPlans, pricingFeatureGroups } from "@/lib/content";
import PlanCards from "./PlanCards";
import CompareTable from "./CompareTable";
import CustomBuilder from "./CustomBuilder";
import QuoteModal from "./QuoteModal";

const TABS = [
  {
    id: "plans",
    label: "Pricing Plans",
    eyebrow: "Plans & Pricing",
    title: "Premium revenue cycle care,",
    accent: "priced on your results.",
    body: "Three plans built around practice size — HIPAA-compliant and priced as a share of what we collect.",
  },
  {
    id: "custom",
    label: "Build Your Own",
    eyebrow: "Custom Plan Builder",
    title: "Only pay for what you need —",
    accent: "build your own plan.",
    body: "Pick your services, tell us about your practice, and get a tailored quote in 3 quick steps.",
  },
];

// Interactive body of /pricing: hero with a Plans / Build-your-own switch,
// the active view directly beneath it, and one shared QuoteModal.
export default function PricingClient() {
  const [tab, setTab] = useState("plans");
  const [request, setRequest] = useState(null);
  const [openCount, setOpenCount] = useState(0);
  const tabsRef = useRef(null);
  const active = TABS.find((t) => t.id === tab);

  const switchTab = useCallback((id) => {
    setTab(id);
    const top = tabsRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) window.scrollTo({ top: window.scrollY + top - 120, behavior: "smooth" });
  }, []);

  const openPlan = useCallback((plan) => {
    setRequest({ type: "plan", plan: plan.name, rate: plan.rate, rateNote: plan.rateNote });
    setOpenCount((n) => n + 1);
  }, []);

  const openCustom = useCallback((services, details) => {
    setRequest({ type: "custom", services, ...details });
    setOpenCount((n) => n + 1);
  }, []);

  const close = useCallback(() => setRequest(null), []);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden pb-24 pt-8"
        style={{ background: "linear-gradient(135deg, #0b1f33 0%, #173b57 55%, #0b2a22 100%)" }}
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.045]" aria-hidden xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pricing-hex" x="0" y="0" width="50" height="44" patternUnits="userSpaceOnUse">
              <polygon points="25,2 46,13 46,36 25,47 4,36 4,13" fill="none" stroke="#20c4d6" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pricing-hex)" />
        </svg>
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-10"
          style={{ background: "radial-gradient(ellipse at top right, #20c4d6, transparent 65%)" }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#20c4d6]">{active.eyebrow}</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {active.title}{" "}
            <span className="bg-gradient-to-r from-[#20c4d6] to-[#5eead4] bg-clip-text text-transparent">{active.accent}</span>
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-white/55 sm:text-base">{active.body}</p>

          {/* View switch */}
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Pricing options"
            className="mx-auto mt-6 inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur"
          >
            {TABS.map((t) => {
              const on = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={on}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => switchTab(t.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all sm:px-6 ${
                    on ? "bg-white text-[var(--color-navy)] shadow-lg" : "text-white/70 hover:text-white"
                  }`}
                >
                  {t.id === "plans" ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect x="3" y="3" width="7" height="18" rx="1.5" /><rect x="14" y="3" width="7" height="18" rx="1.5" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M12 3v18M3 12h18" />
                    </svg>
                  )}
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active view */}
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        <div className="relative mx-auto -mt-14 max-w-6xl px-6 pb-20">
          {tab === "plans" ? (
            <PlanCards plans={pricingPlans} onSelect={openPlan} onBuildCustom={() => switchTab("custom")} />
          ) : (
            <CustomBuilder plans={pricingPlans} onRequest={openCustom} />
          )}
        </div>
        {tab === "plans" && <CompareTable plans={pricingPlans} groups={pricingFeatureGroups} onSelect={openPlan} />}
      </div>

      {request && <QuoteModal key={openCount} request={request} onClose={close} />}
    </>
  );
}
