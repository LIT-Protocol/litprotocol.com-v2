import { Container } from '@mantine/core';
import LandingHero from '../LandingHero/LandingHero';
import TrustStrip from '../TrustStrip/TrustStrip';
import CustomerProof from '../TrustStrip/CustomerProof';
import ChainSecured from '../ChainSecured/ChainSecured';
import ConfidentialCompute from '../ConfidentialCompute/ConfidentialCompute';
import RunAnywhere from '../RunAnywhere/RunAnywhere';
import UseCases from '../UseCases/UseCases';
import LandingHowItWorks from '../LandingHowItWorks/LandingHowItWorks';
import { QuoteCarousel } from '../QuoteCarousel/QuoteCarousel';
import Reveal from '../ui/Reveal';
import {
  PreviewWallets,
  PreviewCompute,
  PreviewInfrastructure,
  PreviewClosing,
} from './PreviewSections';

const LandingPage = ({ draft = true }: { draft?: boolean }) => {
  return (
    <div className="overflow-x-hidden relative min-h-full bg-coal-950 text-off-white">
      <LandingHero draft={draft} />
      {draft ? <CustomerProof /> : <TrustStrip />}
      {draft ? (
        <>
          <PreviewWallets />
          <PreviewCompute />
          <PreviewInfrastructure />
        </>
      ) : (
        <>
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
        </>
      )}
      {!draft && (
        <Reveal>
          <section className="bg-coal-950 border-b border-white/5">
            <Container size="lg" className="!py-24">
              <QuoteCarousel />
            </Container>
          </section>
        </Reveal>
      )}
      {draft ? <PreviewClosing /> : <LandingHowItWorks />}
    </div>
  );
};

export default LandingPage;
