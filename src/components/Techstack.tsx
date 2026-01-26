import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

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
            const profileImages = gsap.utils.toArray<HTMLDivElement>(".tech-img");
            const nameElements = gsap.utils.toArray<HTMLDivElement>(".tech-name");
            const nameHeadings = gsap.utils.toArray<HTMLHeadingElement>(".tech-name h1");

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
                    const profileImagesContainer = document.querySelector(".profile-images");
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
            className="techstack-section"
        >
            <div className="profile-images">
                {techItems.map((tech, index) => (
                    <div
                        key={index}
                        className="tech-img"
                    >
                        <img src={tech.image} alt={tech.name} />
                    </div>
                ))}
            </div>

            <div className="profile-names">
                <div className="tech-name default">
                    <h1>{title}</h1>
                </div>
                {techItems.map((tech, index) => (
                    <div key={index} className="tech-name">
                        <h1>{tech.name}</h1>
                    </div>
                ))}
            </div>

            <style>{`
                @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

                .techstack-section {
                    position: relative;
                    width: 100vw;
                    height: 100svh;
                    background-color: #0f0f0f;
                    color: #e3e3db;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 2.5em;
                    overflow: hidden;
                }

                .profile-images {
                    width: max-content;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .tech-img {
                    position: relative;
                    width: 70px;
                    height: 70px;
                    padding: 5px;
                    cursor: pointer;
                    will-change: width, height;
                }

                .tech-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 0.5rem;
                }

                .profile-names {
                    position: relative;
                    width: 100%;
                    height: 15rem;
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
                    overflow: hidden;
                }

                .tech-name {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    height: auto;
                }

                .tech-name h1 {
                    position: relative;
                    width: 100%;
                    text-align: center;
                    text-transform: uppercase;
                    font-family: "Barlow Condensed", sans-serif;
                    font-size: 15rem;
                    font-weight: 900;
                    letter-spacing: -0.2rem;
                    line-height: 1;
                    color: #f93535;
                    user-select: none;
                    transform: translateY(-120%);
                }

                .tech-name.default h1 {
                    color: #e3e3db;
                    transform: translateY(-20%);
                }

                .tech-name h1 .letter {
                    display: inline-block;
                    position: relative;
                    transform: translateY(100%);
                    will-change: transform;
                }

                @media screen and (max-width: 900px) {
                    .techstack-section {
                        flex-direction: column-reverse;
                    }

                    .profile-images {
                        flex-wrap: wrap;
                        max-width: 90%;
                        justify-content: center;
                    }

                    .tech-img {
                        width: 60px;
                        height: 60px;
                        padding: 2.5px;
                    }

                    .profile-names {
                        height: 4rem;
                    }

                    .tech-name h1 {
                        font-size: 4rem;
                        letter-spacing: 0;
                    }
                }
            `}</style>
        </section>
    );
}
