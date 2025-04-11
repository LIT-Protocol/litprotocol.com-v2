import LandingFeatures2 from '../LandingFeatures/LandingFeatures';
import LandingHero from '../LandingHero/LandingHero';
import Metrics from '../Metrics/Metrics';
import LitNetwork from '../LitNetwork/LitNetwork';

const LandingPage = () => {
  return (
    <>
      <LandingHero /> {/* Includes partners and blog */}
      <Metrics />
      <LandingFeatures2/>
      <LitNetwork />
      {/* Ctas have been added to the footer */}
    </>
  );
};

export default LandingPage;
