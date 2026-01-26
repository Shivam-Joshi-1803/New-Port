import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroTextRevealProps {
    items?: Array<{ main: string; hover: string }>;
}

const DEFAULT_ITEMS = [
    { main: "CREATIVE", hover: "DEVELOPER" },
    { main: "DESIGNER", hover: "& INNOVATOR" },
    { main: "PORTFOLIO", hover: "2026" },
];

export default function HeroTextReveal({ items = DEFAULT_ITEMS }: HeroTextRevealProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const elements = gsap.utils.toArray<HTMLElement>(".hero-reveal-text");

            elements.forEach((el, index) => {
                // Animate background-size to reveal gradient on scroll
                gsap.to(el, {
                    backgroundSize: "100%",
                    ease: "none",
                    scrollTrigger: {
                        id: `hero-reveal-${index}`,
                        trigger: el,
                        start: "center 80%",
                        end: "center 20%",
                        scrub: true,
                        // markers: true, // Uncomment to debug
                    },
                });
            });
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="h-screen bg-[#0d0d0d] px-8 flex items-center justify-center mt-0">
            <div className="w-full space-y-0">
                {items.map((item, i) => (
                    <h1
                        key={i}
                        className="hero-reveal-text text-[10vw] font-black leading-none border-b border-[#2F2B28] relative m-0"
                    >
                        {item.main}
                        <span className="hero-clip-span">
                            {item.hover}
                        </span>
                    </h1>
                ))}
            </div>
        </section>
    );
}
