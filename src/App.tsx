import IntroSection from "./components/IntroSection";
import HeroTextReveal from "./components/HeroTextReveal";
import RabbitHoleText from "./components/RabbitHoleText";
import StartProjectSection from "./components/StartProjectSection";

export default function App() {
  return (
    <div className="relative overflow-x-hidden">
      <RabbitHoleText text="Portfolio" />
      <IntroSection />
      <HeroTextReveal
        items={[
          { main: "CREATIVE", hover: "DEVELOPER" },
          { main: "DESIGNER", hover: "& INNOVATOR" },
          { main: "PORTFOLIO", hover: "2026" },
        ]}
      />
      <StartProjectSection />
    </div>
  );
}