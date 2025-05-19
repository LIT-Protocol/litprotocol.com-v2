import LandingFeatures2 from '../LandingFeatures/LandingFeatures';
import LandingHero from '../LandingHero/LandingHero';
import Metrics from '../Metrics/Metrics';
import LitNetwork from '../LitNetwork/LitNetwork';

const LandingPage = () => {
  return (
    <>
      <LandingHero /> {/* Includes partners and blog */}
      <Metrics />
      <LandingFeatures2 />
      <div className="absolute -left-[2rem] -bottom-[8rem] z-2 pointer-events-none w-[115%] overflow-x-hidden">
        <img src="/textures/network.png" alt="" className="w-full h-auto" />
      </div>
      <LitNetwork />
      {/* Ctas have been added to the footer */}
    </>
  );
};

export default LandingPage;
