import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StartProjectSectionProps {
    text?: string;
}

export default function StartProjectSection({ text = "LET'S TALK Ideas" }: StartProjectSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !textRef.current) return;

        const ctx = gsap.context(() => {
            // Set initial position (text starts from right, off-screen)
            gsap.set(textRef.current, {
                x: "100%",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=300%", // Long scroll for smooth movement
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    // markers: true, // Uncomment to debug
                },
            });

            // Animate text from right (100%) to left (-100%)
            tl.to(textRef.current, {
                x: "-100%",
                ease: "none",
            });
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen bg-black overflow-hidden flex items-center justify-center"
        >
            {/* Large Scrolling Text */}
            <h2
                ref={textRef}
                className="text-[20vw] font-black text-white whitespace-nowrap leading-none tracking-tighter uppercase"
                style={{ willChange: "transform" }}
            >
                {text}
            </h2>

            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
        </section>
    );
}
