import LandingFeatures2 from '../LandingFeatures/LandingFeatures';
import LandingHero from '../LandingHero/LandingHero';
import Metrics from '../Metrics/Metrics';
import LitNetwork from '../LitNetwork/LitNetwork';

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden relative min-h-full bg-coal-950">
      <LandingHero /> {/* Includes partners and blog */}
      <div className="absolute -left-[15rem] md:-left-[2rem] top-1/6 md:top-1/5 z-2 pointer-events-none w-[220%] md:w-[115%]">
        <img src="/textures/metrics.png" alt="" className="w-full h-auto" />
      </div>
      <Metrics />
      <LandingFeatures2 />
      <LitNetwork />
      <div className="absolute left-0 md:-left-[2rem] bottom-[40rem] md:bottom-0 z-2 pointer-events-none w-[220%] md:w-[115%] opacity-60">
        <img
          src="/textures/network.png"
          alt=""
          className="w-full h-auto block"
        />
      </div>
      {/* Ctas have been added to the footer */}
    </div>
  );
};

export default LandingPage;
