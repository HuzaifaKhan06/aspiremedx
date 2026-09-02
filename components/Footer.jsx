import { nav, contact } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-navy)] font-mono text-xs text-white">
                AX
              </span>
              <span className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-navy)]">
                AspireMedX
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-[var(--color-muted)]">
              Medical billing and revenue cycle management for practices that
              would rather focus on patients than paperwork.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                Site
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-[var(--color-navy)] hover:text-[var(--color-teal)]">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                Contact
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-navy)]">
                <li>{contact.email}</li>
                <li>{contact.phone}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-muted)] sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} AspireMedX. All rights reserved.</p>
          <p>Demo build — content and figures are placeholders.</p>
        </div>
      </div>
    </footer>
  );
}
