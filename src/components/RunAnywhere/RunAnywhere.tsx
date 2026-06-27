'use client';

import { Container } from '@mantine/core';
import { IconArrowNarrowRight, IconServer2 } from '@tabler/icons-react';
import { Button } from '../ui/Button';
import { QUICKSTART_LINK, DOCS_LINK } from '@/utils/constants';

// Brand marks, rendered monochrome via currentColor.
const AwsMark = ({ className }: { className?: string }) => (
  <svg viewBox="-1 91 259 62" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M230.993377,120.964238 C203.104636,141.562914 162.58543,152.498013 127.745695,152.498013 C78.9192053,152.498013 34.9245033,134.442384 1.69536424,104.434437 C-0.932450331,102.060927 1.4410596,98.8397351 4.57748344,100.704636 C40.5192053,121.557616 84.8529801,134.188079 130.712583,134.188079 C161.65298,134.188079 195.645033,127.745695 226.924503,114.521854 C231.586755,112.402649 235.570861,117.57351 230.993377,120.964238 Z M242.606623,107.740397 C239.046358,103.162914 219.04106,105.536424 209.970861,106.638411 C207.258278,106.977483 206.834437,104.603974 209.292715,102.823841 C225.229139,91.6344371 251.422517,94.8556291 254.474172,98.5854305 C257.525828,102.4 253.62649,128.593377 238.707285,141.139073 C236.418543,143.088742 234.21457,142.071523 235.231788,139.528477 C238.622517,131.136424 246.166887,112.233113 242.606623,107.740397 Z" />
  </svg>
);

const GoogleCloudMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z" />
  </svg>
);

const TARGETS = [
  { mark: <AwsMark className="h-[18px] w-auto" />, label: 'AWS' },
  { mark: <GoogleCloudMark className="h-6 w-6" />, label: 'Google Cloud' },
  { mark: <IconServer2 size={24} stroke={1.5} />, label: 'On-prem' },
];

const RunAnywhere = () => (
  <section className="bg-coal-950 border-b border-white/5">
    <Container size="lg" className="!py-24 text-center">
      <div className="font-mono text-xs uppercase tracking-[0.22em] text-gold-500">
        Managed, not locked in
      </div>
      <h2 className="mt-4 text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium leading-tight tracking-tight text-balance">
        We run the infrastructure. You{' '}
        <span className="text-lit-orange whitespace-nowrap">just start</span>.
      </h2>
      <p className="mt-5 max-w-[56ch] mx-auto text-white/65 text-lg leading-relaxed text-pretty">
        No managed sandbox to lock you in. Deploy in your own cloud or
        on-premise — your infrastructure, your keys, your governance — with the
        same attested guarantees wherever it runs.
      </p>
      <div className="mt-9 flex justify-center">
        <Button
          href={QUICKSTART_LINK}
          target="_blank"
          rel="noopener noreferrer"
          rightIcon={<IconArrowNarrowRight stroke={2} />}
        >
          Start building
        </Button>
      </div>

      <div className="mt-14 border-t border-white/5 pt-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
          Prefer to run it yourself?
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {TARGETS.map(({ mark, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 text-white/55 transition hover:text-white"
            >
              {mark}
              <span className="text-base font-medium tracking-tight">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-7">
          <a
            href={DOCS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-white/55 underline-offset-4 transition hover:text-lit-orange hover:underline"
          >
            Self-hosting docs →
          </a>
        </div>
      </div>
    </Container>
  </section>
);

export default RunAnywhere;
