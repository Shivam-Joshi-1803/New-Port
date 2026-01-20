import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Import local images from assets
import img1 from "../assets/IMG_20230423_103943_267.jpg";
import img2 from "../assets/IMG_20230523_234549_245.jpg";
import img3 from "../assets/IMG_20230826_150820.jpg";
import img4 from "../assets/IMG_20231002_223755.jpg";
import img5 from "../assets/IMG_20240209_085639.jpg";
import img6 from "../assets/WhatsApp Image 2024-07-04 at 20.00.54_7c722a99.jpg";
import img7 from "../assets/WhatsApp Image 2025-03-30 at 12.43.41_f3ba6dae.jpg";
import img8 from "../assets/WhatsApp Image 2025-03-30 at 12.43.44_5c0a6daa.jpg";

const IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function ImageTrailIntro() {
    const contentRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const currentImageIndex = useRef(0);
    const lastMousePos = useRef({ x: 0, y: 0 });
    const zIndex = useRef(1);

    // Linear interpolation helper
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    useEffect(() => {
        // Preload images
        let loadedCount = 0;
        const totalImages = IMAGES.length;

        IMAGES.forEach((src) => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    setImagesLoaded(true);
                }
            };
            img.src = src;
        });
    }, []);

    useEffect(() => {
        if (!imagesLoaded || !contentRef.current) return;

        const mousePos = { x: 0, y: 0 };
        const cacheMousePos = { x: 0, y: 0 };
        let requestId: number;

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
        };

        const render = () => {
            // Smooth lerp for cache position
            cacheMousePos.x = lerp(cacheMousePos.x, mousePos.x, 0.1);
            cacheMousePos.y = lerp(cacheMousePos.y, mousePos.y, 0.1);

            // Calculate distance moved
            const distance = Math.hypot(
                mousePos.x - lastMousePos.current.x,
                mousePos.y - lastMousePos.current.y
            );

            // Spawn image when distance threshold is met
            if (distance > 100) {
                const currentImage = imagesRef.current[currentImageIndex.current];

                if (currentImage) {
                    // Update z-index
                    zIndex.current++;
                    currentImage.style.zIndex = String(zIndex.current);

                    // Get image dimensions
                    const rect = currentImage.getBoundingClientRect();
                    const imgWidth = rect.width || 200;
                    const imgHeight = rect.height || 200;

                    // Kill any existing tweens on this image
                    gsap.killTweensOf(currentImage);

                    // Set initial position at the lagging (cache) position
                    gsap.set(currentImage, {
                        x: cacheMousePos.x - imgWidth / 2,
                        y: cacheMousePos.y - imgHeight / 2,
                        scale: 1,
                        opacity: 1,
                        rotation: 0,
                    });

                    // Create the two-phase animation
                    const tl = gsap.timeline();

                    // Phase 1: Catch-up - move from cache position to actual mouse position
                    tl.to(currentImage, {
                        duration: 0.9,
                        x: mousePos.x - imgWidth / 2,
                        y: mousePos.y - imgHeight / 2,
                        ease: "expo.out",
                    });

                    // Phase 2: Exit - fade out and shrink (starts 0.4s after catch-up begins)
                    tl.to(currentImage, {
                        duration: 1.0,
                        opacity: 0,
                        scale: 0.2,
                        ease: "power4.out",
                    }, "-=0.5"); // Overlap with the catch-up animation

                    // Update indices
                    currentImageIndex.current = (currentImageIndex.current + 1) % IMAGES.length;
                    lastMousePos.current = { x: mousePos.x, y: mousePos.y };
                }
            }

            requestId = requestAnimationFrame(render);
        };

        window.addEventListener("mousemove", handleMouseMove);
        requestId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(requestId);
        };
    }, [imagesLoaded]);

    return (
        <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
            <div ref={contentRef} className="relative w-full h-screen flex items-center justify-center">
                {/* Trail Images */}
                {IMAGES.map((src, index) => (
                    <img
                        key={index}
                        ref={(el) => {
                            if (el) imagesRef.current[index] = el;
                        }}
                        src={src}
                        alt=""
                        className="absolute pointer-events-none select-none opacity-0"
                        style={{
                            top: 0,
                            left: 0,
                            width: "200px",
                            height: "auto",
                            maxWidth: "200px",
                            willChange: "transform, opacity",
                        }}
                    />
                ))}

                {/* Main Title */}
                <h1
                    className="relative text-[clamp(60px,12vw,200px)] font-black text-white uppercase tracking-tight select-none"
                    style={{ zIndex: 10000 }}
                >
                    ARTWORLD
                </h1>
            </div>
        </section>
    );
}
