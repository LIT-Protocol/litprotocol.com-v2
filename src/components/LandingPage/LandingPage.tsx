import { Container } from '@mantine/core';
import LandingHero from '../LandingHero/LandingHero';
import TrustStrip from '../TrustStrip/TrustStrip';
import ChainSecured from '../ChainSecured/ChainSecured';
import LandingHowItWorks from '../LandingHowItWorks/LandingHowItWorks';
import { QuoteCarousel } from '../QuoteCarousel/QuoteCarousel';

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden relative min-h-full bg-coal-950 text-off-white">
      <LandingHero />
      <TrustStrip />
      <ChainSecured />
      <section className="bg-coal-950 border-b border-white/5">
        <Container size="lg" className="!py-24">
          <QuoteCarousel />
        </Container>
      </section>
      <LandingHowItWorks />
    </div>
  );
};

export default LandingPage;
