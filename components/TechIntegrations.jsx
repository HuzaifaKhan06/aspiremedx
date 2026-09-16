import { caqhServices, payerPortals, clearinghouses, pmSoftware } from "@/lib/content";
import Reveal from "./Reveal";

export default function TechIntegrations() {
  return (
    <section id="technology" className="border-y border-[var(--color-line)] bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-teal)]">
            Technology & Integrations
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-4xl">
            We work inside the systems you already use.
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            Modern revenue cycle success depends on seamless connectivity with
            the systems your practice already runs on. AspireMedX actively
            manages and integrates with the platforms below.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] p-7">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
              CAQH ProView Maintenance
            </h3>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              The industry standard for provider data — incomplete profiles
              are a leading cause of enrollment delays and claim rejections.
            </p>
            <ul className="mt-4 space-y-2.5">
              {caqhServices.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-snug text-[var(--color-ink)]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-teal)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={60} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] p-7">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                Payer Portal Management
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Ongoing eligibility, authorization, claim status, and demographic
                updates across the portals payers require.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {payerPortals.map((portal) => (
                  <span
                    key={portal}
                    className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-[var(--color-navy)] ring-1 ring-inset ring-[var(--color-line)]"
                  >
                    {portal}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] p-7">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                Clearinghouses
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                We configure edits, monitor rejection reports, and optimize
                submission pathways for maximum clean-claim performance.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {clearinghouses.map((house) => (
                  <span
                    key={house}
                    className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-[var(--color-navy)] ring-1 ring-inset ring-[var(--color-line)]"
                  >
                    {house}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-12">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
            Practice Management & Billing Software
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-[var(--color-muted)]">
            We work inside or alongside the major PM and EHR platforms
            medical groups already run — no forced platform switch required.
          </p>

          <div className="mt-6 overflow-x-auto rounded-lg border border-[var(--color-line)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] bg-[var(--color-bg)]">
                  <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                    Platform
                  </th>
                  <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                    Capabilities we support
                  </th>
                </tr>
              </thead>
              <tbody>
                {pmSoftware.map((row, i) => (
                  <tr
                    key={row.platform}
                    className={i % 2 === 1 ? "bg-[var(--color-bg)]" : "bg-white"}
                  >
                    <td className="whitespace-nowrap px-5 py-3 align-top font-semibold text-[var(--color-navy)]">
                      {row.platform}
                    </td>
                    <td className="px-5 py-3 align-top text-[var(--color-muted)]">
                      {row.capability}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
