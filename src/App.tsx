import IntroSection from "./components/IntroSection";
import HeroTextReveal from "./components/HeroTextReveal";
import RabbitHoleText from "./components/RabbitHoleText";
import StartProjectSection from "./components/StartProjectSection";
import Techstack from "./components/Techstack";
import CurvedLoop from "./components/CurvedLoop";
import CircularText from "./components/CircularText";
import CountUp from "./components/CountUp";
import CircularGallery from './components/CircularGallery';
import StaggeredMenu from './components/StaggeredMenu';
import Beams from './components/Beams';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export default function App() {
  return (
    <div className="relative overflow-x-hidden">

      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
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
      </div>
      <div style={{ height: '100vh', background: '#1a1a1a' }}>
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
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </div>

      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery
          bend={6}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <CountUp
          from={0}
          to={100}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
          startCounting={false}
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
        speed={1}
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
      <RabbitHoleText text="Projects" />
      <Techstack />
      <StartProjectSection />
    </div>
  );
}