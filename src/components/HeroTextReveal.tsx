import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroTextRevealProps {
  items?: Array<{ main: string; hover: string }>;
}

const DEFAULT_ITEMS = [
  { main: "CREATIVE", hover: "DEVELOPER" },
  { main: "FRONTEND", hover: "ENGINEER" },
  { main: "PORTFOLIO", hover: "2026" },
  { main: "MOTION", hover: "EXPERIENCES" },
];

export default function HeroTextReveal({
  items = DEFAULT_ITEMS,
}: HeroTextRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(".hero-reveal-text");

      ScrollTrigger.matchMedia({
        // Desktop / Large screens
        "(min-width: 768px)": () => {
          elements.forEach((el, index) => {
            gsap.to(el, {
              backgroundSize: "100%",
              ease: "none",
              scrollTrigger: {
                id: `hero-reveal-desktop-${index}`,
                trigger: el,
                start: "center 80%",
                end: "center 20%",
                scrub: true,
              },
            });
          });
        },

        // Mobile / Small screens
        "(max-width: 767px)": () => {
          elements.forEach((el, index) => {
            gsap.to(el, {
              backgroundSize: "100%",
              ease: "none",
              scrollTrigger: {
                id: `hero-reveal-mobile-${index}`,
                trigger: el,
                start: "top 85%",
                end: "top 40%",
                scrub: true,
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#0d0d0d] flex items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-screen-xl px-4 sm:px-8 lg:px-12">
        {items.map((item, i) => (
          <h1
            key={i}
            className="
              hero-reveal-text
              relative
              w-full
              font-black
              leading-[0.95]
              text-[clamp(3rem,8vw,9rem)]
              border-b border-[#2F2B28]
              py-2 sm:py-0
              select-none
            "
          >
            {item.main}
            <span className="hero-clip-span">{item.hover}</span>
          </h1>
        ))}
      </div>
    </section>
  );
}
