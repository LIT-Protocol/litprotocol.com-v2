import { Container } from '@mantine/core';
import LandingHero from '../LandingHero/LandingHero';
import TrustStrip from '../TrustStrip/TrustStrip';
import ChainSecured from '../ChainSecured/ChainSecured';
import ConfidentialCompute from '../ConfidentialCompute/ConfidentialCompute';
import RunAnywhere from '../RunAnywhere/RunAnywhere';
import UseCases from '../UseCases/UseCases';
import LandingHowItWorks from '../LandingHowItWorks/LandingHowItWorks';
import { QuoteCarousel } from '../QuoteCarousel/QuoteCarousel';
import Reveal from '../ui/Reveal';

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden relative min-h-full bg-coal-950 text-off-white">
      <LandingHero />
      <TrustStrip />
      <Reveal>
        <ChainSecured />
      </Reveal>
      <Reveal>
        <ConfidentialCompute />
      </Reveal>
      <Reveal>
        <RunAnywhere />
      </Reveal>
      <Reveal>
        <UseCases />
      </Reveal>
      <Reveal>
        <section className="bg-coal-950 border-b border-white/5">
          <Container size="lg" className="!py-24">
            <QuoteCarousel />
          </Container>
        </section>
      </Reveal>
      <LandingHowItWorks />
    </div>
  );
};

export default LandingPage;
