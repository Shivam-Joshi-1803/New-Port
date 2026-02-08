import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
    number: string;
    title: string;
    description: string;
    backgroundColor: string;
}

const cardsData: CardData[] = [
    {
        number: '01',
        title: 'Start with structured or unstructured data.',
        description: "Whether you're a non-technical type, a data scientist, or an analyst — and whether your data is structured or raw — Pienso can help you categorize, label and analyze it.",
        backgroundColor: '#02bb61'
    },
    {
        number: '02',
        title: 'Train easily, experiment boundlessly.',
        description: 'Sculpt each topic and imprint your intuitive knowledge with nuanced labels and categorizations. Instead of committing to one general LLM, use the best model for your current need.',
        backgroundColor: '#d8e3de'
    },
    {
        number: '03',
        title: 'Fine-tune with full transparency.',
        description: "While some closed-source LLMs allow limited fine-tuning, they're nothing like the customization possible when you can see and change every perimeter. Fine-tune your LLM and pay only when you deploy — that's the power of Pienso.",
        backgroundColor: '#e0e5e3'
    },
    {
        number: '04',
        title: 'Own your models – and their integrity.',
        description: "Closed-model providers like GPT-4 can suddenly change parameters, making them unreliable. With Pienso, you have complete control over your models — no changes that you haven't made yourself.",
        backgroundColor: '#e0e5e3'
    },
    {
        number: '05',
        title: 'Deploy quickly and cost-effectively.',
        description: 'Deploy your fine-tuned LLM in your own environment under your enterprise security. Accelerate deployment on cloud through our trusted low-latency partners like Gcore for the ideal combination of security and speed.',
        backgroundColor: '#dbe4e0'
    }
];

const HorizontalScrollCards = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const cardsRefs = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const totalCards = cardsData.length;
        const slidingCards = totalCards - 1; // Only 4 cards slide (01-04), card 05 stays

        // Create ScrollTrigger - only need scroll for the sliding cards
        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: `+=${slidingCards * 400}vh`, // 400vh per sliding card (4 cards = 1600vh total)
            pin: true,
            scrub: 3,
            onUpdate: (self) => {
                const progress = self.progress;

                // New approach: Counter moves smoothly and continuously with scroll
                // Map the scroll progress directly to counter position

                // Calculate continuous progress across all 5 cards
                // We want counter to go from 0 (showing 01) to 4 (showing 05)
                const counterPosition = progress * (totalCards - 1);

                // Update counter with smooth continuous movement
                if (counterRef.current) {
                    gsap.to(counterRef.current, {
                        y: `${-counterPosition * 20}%`,
                        duration: 0.3,
                        ease: 'none', // No easing for direct 1:1 mapping with scroll
                        overwrite: true
                    });
                }

                // For card sliding, we still use the discrete approach
                // Calculate which card is currently sliding (0-3 for cards 01-04)
                const totalProgress = progress * slidingCards;
                const currentCardIndex = Math.floor(totalProgress);
                const cardTransitionProgress = totalProgress - currentCardIndex;

                // Animate each card
                cardsRefs.current.forEach((card, index) => {
                    if (!card) return;

                    const cardInner = card.querySelector('.card-inner') as HTMLElement;
                    if (!cardInner) return;

                    let slideAmount = 0;

                    // Last card (index 4 = card 05) never slides
                    if (index === totalCards - 1) {
                        slideAmount = 0; // Card 05 stays in place
                    } else {
                        // Cards 01-04 slide normally
                        if (index < currentCardIndex) {
                            // Cards that have completed their transition are fully off-screen
                            slideAmount = -100;
                        } else if (index === currentCardIndex) {
                            // Current card is actively sliding
                            const easedProgress = gsap.parseEase('power2.inOut')(cardTransitionProgress);
                            slideAmount = -easedProgress * 100;
                        } else {
                            // Future cards haven't started sliding yet
                            slideAmount = 0;
                        }
                    }

                    // Apply the slide transform
                    gsap.to(cardInner, {
                        x: `${slideAmount}%`,
                        duration: 0.6,
                        ease: 'power2.out'
                    });

                    // Grayscale effect for images (except first card)
                    const imageContainer = card.querySelector('.image-container') as HTMLElement;
                    if (imageContainer && index !== 0) {
                        let grayscale = 0;
                        let brightness = 1;

                        // Last card stays without grayscale
                        if (index === totalCards - 1) {
                            grayscale = 0;
                            brightness = 1;
                        } else if (index === currentCardIndex) {
                            // Current card's image transitions during slide
                            grayscale = cardTransitionProgress * 95;
                            brightness = 1 + (cardTransitionProgress * 0.47);
                        } else if (index < currentCardIndex) {
                            // Already transitioned cards stay grayscale
                            grayscale = 95;
                            brightness = 1.47;
                        }

                        gsap.to(imageContainer, {
                            filter: `grayscale(${grayscale}%) brightness(${brightness})`,
                            duration: 0.6,
                            ease: 'power2.out'
                        });
                    }

                    // Z-index management
                    card.style.zIndex = String(totalCards - index);
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <>
            {/* Blank scroll space before section */}
            <div style={{ height: '10vh', backgroundColor: '#1c1c1cff' }} />

            <section
                ref={sectionRef}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '72px',
                    overflow: 'hidden',
                    backgroundColor: '#1c1c1cff',
                    minHeight: '100vh'
                }}
            >
                {/* Header */}
                <div
                    style={{
                        width: '100%',
                        maxWidth: '2000px',
                        margin: '0 auto',
                        padding: '0 24px'
                    }}
                >
                    <header
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '16px',
                            padding: '20px 0 0 0'
                        }}
                    >
                        {/* Title */}
                        <h3
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: 'clamp(33px, 5vw, 57px)',
                                lineHeight: '1',
                                letterSpacing: '-0.015em',
                                fontWeight: '500',
                                color: '#02bb61',
                                maxWidth: '10ch'
                            }}
                        >
                            How to work with Pienso
                        </h3>

                        {/* Counter */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                gap: '16px',
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: 'clamp(48px, 8vw, 101px)',
                                lineHeight: '0.9',
                                letterSpacing: '-0.03em',
                                fontWeight: '500'
                            }}
                        >
                            <div
                                style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    height: '1em',
                                    width: '2ch'
                                }}
                            >
                                <div
                                    ref={counterRef}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%'
                                    }}
                                >
                                    {cardsData.map((card, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                display: 'block',
                                                height: '1em',
                                                lineHeight: '1em',
                                                color: '#02bb61',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {card.number}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <span style={{ color: '#131313' }}>/</span>
                            <span style={{ color: '#131313' }}>05</span>
                        </div>
                    </header>
                </div>

                {/* Cards Container */}
                <article
                    style={{
                        display: 'grid',
                        height: '100%',
                        maxHeight: '70vh'
                    }}
                >
                    <ul
                        style={{
                            display: 'grid',
                            gridArea: '1/1',
                            listStyle: 'none',
                            margin: 0,
                            padding: 0
                        }}
                    >
                        {cardsData.map((card, index) => (
                            <li
                                key={index}
                                ref={(el) => {
                                    cardsRefs.current[index] = el;
                                }}
                                style={{
                                    display: 'grid',
                                    gridArea: '1/1',
                                    transition: 'transform 0.2s linear',
                                    willChange: 'transform',
                                    transform: 'translateZ(0)',
                                    zIndex: cardsData.length - index
                                }}
                            >
                                <div
                                    style={{
                                        display: 'grid',
                                        overflow: 'hidden',
                                        gridTemplateColumns: 'repeat(4, 4vw) 1fr repeat(4, 4vw)',
                                        padding: '0 80px',
                                        margin: '0 auto',
                                        maxWidth: '2000px',
                                        width: '100%'
                                    }}
                                >
                                    <div
                                        className="card-inner"
                                        style={{
                                            display: 'grid',
                                            gridColumn: `${index + 1} / span ${cardsData.length}`,
                                            backgroundColor: card.backgroundColor,
                                            willChange: 'background-color, transform',
                                            transform: 'translate3d(0%, 0%, 0px)'
                                        }}
                                    >
                                        <div
                                            style={{
                                                padding: '18px 18px 0',
                                                display: 'grid',
                                                gridTemplateRows: '1fr auto'
                                            }}
                                        >
                                            {/* Content */}
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    gap: '16px',
                                                    marginBottom: '80px'
                                                }}
                                            >
                                                <h3
                                                    style={{
                                                        fontFamily: 'Poppins, sans-serif',
                                                        fontSize: 'clamp(28px, 3vw, 43px)',
                                                        lineHeight: '1.05',
                                                        letterSpacing: '-0.02em',
                                                        fontWeight: '500',
                                                        color: '#131313',
                                                        maxWidth: '20ch'
                                                    }}
                                                >
                                                    {card.title}
                                                </h3>
                                                <p
                                                    style={{
                                                        fontFamily: 'system-ui, -apple-system, sans-serif',
                                                        fontSize: 'clamp(16px, 1.2vw, 18px)',
                                                        lineHeight: '1.32',
                                                        letterSpacing: '-0.02em',
                                                        fontWeight: '500',
                                                        color: '#131313',
                                                        maxWidth: '40ch'
                                                    }}
                                                >
                                                    {card.description}
                                                </p>
                                            </div>

                                            {/* Image placeholder */}
                                            <div
                                                className="image-container"
                                                style={{
                                                    height: '100%',
                                                    display: 'grid',
                                                    position: 'relative',
                                                    border: 'none',
                                                    filter: index === 0 ? 'grayscale(0%) brightness(1)' : 'grayscale(0%) brightness(1)',
                                                    willChange: 'filter'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '300px',
                                                        background: index === 0
                                                            ? 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 100%)'
                                                            : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)',
                                                        borderRadius: '12px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'rgba(0,0,0,0.2)',
                                                        fontSize: '14px',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    Image {card.number}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>

            {/* Blank scroll space after section */}
            <div style={{ height: '10vh', backgroundColor: '#1c1c1cff' }} />
        </>
    );
};

export default HorizontalScrollCards;
