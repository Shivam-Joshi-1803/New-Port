import { useState, useEffect } from 'react';
import './App.css';
import styles from './styles/App.module.css';
import IntroSection from "./components/IntroSection";
import HeroTextReveal from "./components/HeroTextReveal";
// import RabbitHoleText from "./components/RabbitHoleText";
import StartProjectSection from "./components/StartProjectSection";
import Techstack from "./components/Techstack";
import CurvedLoop from "./components/CurvedLoop";
import CircularText from "./components/CircularText";
import CountUp from "./components/CountUp";
import CircularGallery from './components/CircularGallery';
// import StaggeredMenu from './components/StaggeredMenu';
import Beams from './components/Beams';
import HorizontalScrollCards from './components/HorizontalScrollCards';
import SmoothScroll from './components/SmoothScroll';
// import Dock from './components/Dock';
// import { VscAccount, VscArchive, VscHome, VscSettingsGear } from 'react-icons/vsc';

// const menuItems = [
//   { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
//   { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
//   { label: 'Services', ariaLabel: 'View our services', link: '/services' },
//   { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
// ];

// const socialItems = [
//   { label: 'Twitter', link: 'https://twitter.com' },
//   { label: 'GitHub', link: 'https://github.com' },
//   { label: 'LinkedIn', link: 'https://linkedin.com' }
// ];


// const items = [
//   { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
//   { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
//   { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
//   { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
// ];



export default function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Block scrolling and interactions during loader
    document.body.style.overflow = 'hidden';
    document.body.style.userSelect = 'none';

    // After loader animation completes, fade it out and show content
    const timer = setTimeout(() => {
      setShowContent(true);
      // Re-enable scrolling after loader fades out
      setTimeout(() => {
        document.body.style.overflow = 'auto';
        document.body.style.userSelect = 'auto';
      }, 1000); // Wait for fade out animation
    }, 5500); // 5.5 seconds for loader (4s count + 1.5s delay)

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
      document.body.style.userSelect = 'auto';
    };
  }, []);


  return (
    <div className="relative overflow-x-hidden">
      {/* Smooth Scroll Effect */}
      <SmoothScroll />

      {/* Loader with CountUp */}
      <div
        className={`loader-overlay ${showContent ? 'fade-out' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000000',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          padding: '1rem',
          pointerEvents: showContent ? 'none' : 'all',
          opacity: showContent ? 0 : 1,
          transition: 'opacity 1s ease-out',
          cursor: showContent ? 'default' : 'wait',
          overflow: 'hidden'
        }}
        onClick={(e) => e.preventDefault()}
        onWheel={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
      >
        <CountUp
          from={0}
          to={100}
          separator=""
          direction="up"
          duration={4}
          className="loader-count-text"
          startWhen={true}
        />
      </div>

      {/* Main Landing Page with Beams Background */}
      <div className={styles.landingPage}>
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
        {/* Content overlay - Text positioned top-left */}
        <div
          className={styles.contentOverlay}
          style={{ opacity: showContent ? 1 : 0 }}
        >
          <h1 className={styles.mainHeading}>
            Hey, I'm Shivam Joshi<br />
            I'm a Developer
          </h1>
          <p className={styles.subtitle}>
            Passionately creating innovative digital<br />
            experiences, rooted in user needs.
          </p>
        </div>

        {/* Animated Scroll Indicator - Center Bottom */}
        <div
          className={styles.scrollIndicator}
          style={{ opacity: showContent ? 1 : 0 }}
        >
          {/* Scroll Mouse Icon */}
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel} />
          </div>
        </div>
      </div>

      {/* <Dock 
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      /> */}

      {/* <div style={{ height: '100vh', background: '#1a1a1a' }}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#B19EEF', '#5227FF']}
          logoUrl="/path-to-your-logo.svg"
          accentColor="#5227FF"
          isFixed={false}
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </div> */}

      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery
          bend={6}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-black">
        <CircularText
          text="REACT*BITS*COMPONENTS*"
          onHover="goBonkers"
          spinDuration={20}
          className="custom-class"
        />
      </div>

      {/* With custom props */}
      <CurvedLoop
        marqueeText="Frontend ✦ Creative ✦ Dev ✦ React ✦ Animate ✦"
        speed={6}
        curveAmount={400}
        direction="right"
        interactive
        className="custom-text-style"
      />

      <IntroSection />
      <HeroTextReveal
        items={[
          { main: "CREATIVE", hover: "DEVELOPER" },
          { main: "FRONTEND", hover: "ENGINEER" },
          { main: "MOTION", hover: "EXPERIENCES" },
          { main: "PORTFOLIO", hover: "2026" },
        ]}
      />
      {/* <RabbitHoleText text="Projects" /> */}
      <HorizontalScrollCards />
      <Techstack />
      <StartProjectSection />
    </div>
  );
}