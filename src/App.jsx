// import ImgSlider from "./components/ImgSlider";
import { Route, Routes } from "react-router-dom";
import AnimatedSlider from "./components/AnimatedSlider";
import TechAnimatedCarousel from "./components/AutoAnimatedCarousel";
import LandingPage from "./components/LandingPage";
import LandingPage2 from "./components/LandingPage2";
import LandingPage3 from "./components/LandingPage3";
import LandingPage4 from "./components/LandingPage4";
import Progress from "./components/Progress";
import SliderAnimated from "./components/SliderAnimated";
import TechTeamShowcase2 from "./components/Tech";
import TechThatPowers from "./components/TechthatPowersUs";
import ToogleDark from "./components/ToogleDark";

import { ShootingStars } from "./components/ShootingStars";
import { StarsBackground } from "./components/StarsBackground";

function App() {
  const bars = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <>
      {/* <div className="relative my-3 h-full w-full flex flex-col gap-4 items-center justify-center"> */}
      {/* {bars.map((val, i) => {
          return <Progress key={i} progress={val} />;
        })} */}
      {/* <ImgSlider /> */}
      {/* <SliderAnimated /> */}
      {/* <AnimatedSlider /> */}
      {/* </div> */}
      {/* <TechThatPowers /> */}
      {/* <div className="flex h-full flex-col custom-container md:mt-11 mt-6 space-y-11 lg:space-y-20">
        <TechTeamShowcase2 />
        <TechAnimatedCarousel />
      </div> */}

      <LandingPage />
      <LandingPage2 />
      <LandingPage3 />
      <LandingPage4 />
      <ToogleDark />

      <div className="relative min-h-screen w-full bg-neutral-950 text-white flex items-center justify-center overflow-hidden">
        {/* Background Star Layers */}
        <StarsBackground starCount={120} />
        <ShootingStars starColor="#ffaa00" trailColor="#ff5500" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Space UI Background
          </h1>
          <p className="mt-4 text-neutral-400">
            Custom shooting star animation effect
          </p>
        </div>
      </div>
    </>
  );
}
export default App;
