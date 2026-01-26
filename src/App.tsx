import IntroSection from "./components/IntroSection";
import HeroTextReveal from "./components/HeroTextReveal";
import RabbitHoleText from "./components/RabbitHoleText";
import StartProjectSection from "./components/StartProjectSection";
import Techstack from "./components/Techstack";

export default function App() {
  return (
    <div className="relative overflow-x-hidden">
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
      <Techstack/>
      <StartProjectSection />
    </div>
  );
}