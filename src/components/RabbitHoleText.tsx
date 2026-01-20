import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RabbitHoleTextProps {
    text?: string;
}

export default function RabbitHoleText({ text = "RABBIT HOLE" }: RabbitHoleTextProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const topHalfRef = useRef<HTMLDivElement>(null);
    const bottomHalfRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !topHalfRef.current || !bottomHalfRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: "rabbit-hole-split",
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=100%",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    // markers: true, // Uncomment to debug
                },
            });

            // Split the text - top half moves up, bottom half moves down
            tl.to(topHalfRef.current, {
                yPercent: -100,
                ease: "power2.inOut",
            }, 0)
                .to(bottomHalfRef.current, {
                    yPercent: 100,
                    ease: "power2.inOut",
                }, 0)
                // Fade in the dark overlay
                .to(overlayRef.current, {
                    opacity: 0.8,
                    ease: "power2.inOut",
                }, 0);
        }, sectionRef); // Scope to the section

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen bg-black overflow-hidden flex items-center justify-center"
        >
            {/* Container for the text that will be split */}
            <div className="relative">
                {/* Top Half - clips the top portion of the text */}
                <div
                    ref={topHalfRef}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)",
                    }}
                >
                    <h1 className="text-[15vw] font-black text-white text-center leading-none tracking-tighter uppercase whitespace-nowrap">
                        {text}
                    </h1>
                </div>

                {/* Bottom Half - clips the bottom portion of the text */}
                <div
                    ref={bottomHalfRef}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                        clipPath: "polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)",
                    }}
                >
                    <h1 className="text-[15vw] font-black text-white text-center leading-none tracking-tighter uppercase whitespace-nowrap">
                        {text}
                    </h1>
                </div>
            </div>

            {/* Dark overlay that fades in as text splits */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black opacity-0 pointer-events-none"
                style={{ zIndex: 5 }}
            />

            {/* Optional: Add a subtle gradient background that shows through
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-blue-900/30 to-black -z-10" /> */}
        </section>
    );
}
