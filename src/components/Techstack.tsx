import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import styles from "../styles/Techstack.module.css";

gsap.registerPlugin(SplitText);

interface TechItem {
    name: string;
    image: string;
}

interface TechstackProps {
    title?: string;
    techItems?: TechItem[];
}

const DEFAULT_TECH_ITEMS: TechItem[] = [
    { name: "React JS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "HTML", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Tailwind", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Next JS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Node JS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "GSAP", image: "https://static.cdnlogo.com/logos/g/31/gsap-greensock.svg" },
];

export default function Techstack({
    title = "Tech Stack",
    techItems = DEFAULT_TECH_ITEMS
}: TechstackProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const profileImages = gsap.utils.toArray<HTMLDivElement>(`.${styles.techImg}`);
            const nameElements = gsap.utils.toArray<HTMLDivElement>(`.${styles.techName}`);
            const nameHeadings = gsap.utils.toArray<HTMLHeadingElement>(`.${styles.techName} h1`);

            // Wait for fonts to load before splitting text
            document.fonts.ready.then(() => {
                // Split text into characters
                nameHeadings.forEach((heading) => {
                    const split = new SplitText(heading, { type: "chars" });
                    split.chars.forEach((char) => {
                        char.classList.add("letter");
                    });
                });

                const defaultLetters = nameElements[0].querySelectorAll(".letter");

                // Set initial state for default title letters
                // They start hidden above (at -100%) and animate to visible (0%)
                gsap.set(defaultLetters, { y: "-100%" });

                // Only apply interactive animations on desktop
                if (window.innerWidth >= 900) {
                    profileImages.forEach((img, index) => {
                        const correspondingName = nameElements[index + 1];
                        if (!correspondingName) return;

                        const letters = correspondingName.querySelectorAll(".letter");

                        img.addEventListener("mouseenter", () => {
                            // Expand image
                            gsap.to(img, {
                                width: 140,
                                height: 140,
                                duration: 0.5,
                                ease: "power4.out",
                            });

                            // Animate tech name letters to reveal (from below to visible)
                            gsap.to(letters, {
                                y: "0%",
                                ease: "power4.out",
                                duration: 0.75,
                                stagger: {
                                    each: 0.025,
                                    from: "center",
                                },
                            });
                        });

                        img.addEventListener("mouseleave", () => {
                            // Shrink image
                            gsap.to(img, {
                                width: 70,
                                height: 70,
                                duration: 0.5,
                                ease: "power4.out",
                            });

                            // Hide tech name letters (back below)
                            gsap.to(letters, {
                                y: "100%",
                                ease: "power4.out",
                                duration: 0.75,
                                stagger: {
                                    each: 0.025,
                                    from: "center",
                                },
                            });
                        });
                    });

                    // Container hover for default title
                    const profileImagesContainer = document.querySelector(`.${styles.profileImages}`);
                    if (profileImagesContainer) {
                        profileImagesContainer.addEventListener("mouseenter", () => {
                            // Show default title by animating letters to visible position
                            gsap.to(defaultLetters, {
                                y: "0%",
                                ease: "power4.out",
                                duration: 0.75,
                                stagger: {
                                    each: 0.025,
                                    from: "center",
                                },
                            });
                        });

                        profileImagesContainer.addEventListener("mouseleave", () => {
                            // Hide default title by animating letters back up
                            gsap.to(defaultLetters, {
                                y: "-100%",
                                ease: "power4.out",
                                duration: 0.75,
                                stagger: {
                                    each: 0.025,
                                    from: "center",
                                },
                            });
                        });
                    }
                }
            });
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className={styles.techstackSection}
        >
            <div className={styles.profileImages}>
                {techItems.map((tech, index) => (
                    <div
                        key={index}
                        className={styles.techImg}
                    >
                        <img src={tech.image} alt={tech.name} />
                    </div>
                ))}
            </div>

            <div className={styles.profileNames}>
                <div className={`${styles.techName} ${styles.default}`}>
                    <h1>{title}</h1>
                </div>
                {techItems.map((tech, index) => (
                    <div key={index} className={styles.techName}>
                        <h1>{tech.name}</h1>
                    </div>
                ))}
            </div>
        </section>
    );
}
