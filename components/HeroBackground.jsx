import Image from "next/image";

// Photo background for a hero section, with a dark brand-tinted fade on top so
// the white hero copy stays readable. Place as the first child of a
// `relative overflow-hidden` section; the existing patterns/glows and content
// render above it. Pass `width` (e.g. "60%") to keep the photo on the right
// side only on large screens, so less of it is cropped in short heroes.
export default function HeroBackground({ src, centered = false, position = "center", width }) {
  const fade = centered
    ? "linear-gradient(180deg, rgba(11,31,51,0.78) 0%, rgba(11,31,51,0.62) 50%, rgba(11,31,51,0.82) 100%)"
    : "linear-gradient(90deg, rgba(11,31,51,0.85) 0%, rgba(11,31,51,0.68) 45%, rgba(23,59,87,0.38) 75%, rgba(11,51,48,0.3) 100%)";

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div
        className={width ? "absolute inset-y-0 right-0 w-full lg:w-[var(--hero-img-w)]" : "absolute inset-0"}
        style={
          width
            ? {
                "--hero-img-w": width,
                maskImage: "linear-gradient(90deg, transparent 0%, #000 25%)",
                WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 25%)",
              }
            : undefined
        }
      >
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes={width ? `(min-width: 1024px) ${width.replace("%", "vw")}, 100vw` : "100vw"}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      <div className="absolute inset-0" style={{ background: fade }} />
      {/* Soft bottom fade so the hero blends into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(180deg, transparent, rgba(11,31,51,0.4))" }}
      />
    </div>
  );
}
