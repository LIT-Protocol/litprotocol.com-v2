import LandingFeatures from '../LandingFeatures/LandingFeatures';
// import LandingPartners from '../LandingPartners/LandingPartners';
import LandingCta from '../LandingCta/LandingCta';
import LandingHero from '../LandingHero/LandingHero';
// import LandingBlog from '../LandingBlog/LandingBlog';
import Metrics from '../Metrics/Metrics';
import LitNetwork from '../LitNetwork/LitNetwork';

const LandingPage = () => {
  return (
    <>
      <LandingHero />
      <Metrics />
      <LandingFeatures /> {/* contains content of lit network*/}
      <LitNetwork />
      {/* Ctas have been added to the footer */}
    </>
  );
};

export default LandingPage;
