import LandingFeatures2 from '../LandingFeatures/LandingFeatures2';
// import LandingPartners from '../LandingPartners/LandingPartners';
import LandingHero from '../LandingHero/LandingHero';
// import LandingBlog from '../LandingBlog/LandingBlog';
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
