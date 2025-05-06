'use client';

import { Container, Group, Text } from '@mantine/core';
import { CONTACT_FORM, DOCS_LINK } from '@/utils/constants';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import LandingPartners from '../LandingPartners/LandingPartners';
import { BlogCarousel } from '../BlogCarousel/BlogCarousel';
import { Button } from '../ui/Button';
import { useEffect, useRef } from 'react';

// Type definitions
type HeroItem = string;
type ItemElement = HTMLDivElement;
type AnimationFrameID = number;
type ScrollContainerRef = React.RefObject<HTMLDivElement>;
type EasingFunction = (t: number) => number;

interface AnimationSettings {
  pauseDuration: number;
  transitionDuration: number;
  fadeZoneSize: number;
  fullCycleDuration: number;
  itemTotalHeight: number;
}

interface LandingHeroProps {
  // Can be extended with props if needed
}

const LandingHero: React.FC<LandingHeroProps> = () => {
  const heroList: HeroItem[] = [
    'Wallets.',
    'User Data.',
    'Agents.',
    'Bridges.',
    'Vaults.',
  ];
  const scrollRef: ScrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Get all item elements
    const itemElements: ItemElement[] = Array.from(
      scrollContainer.children
    ) as ItemElement[];
    const itemHeight: number = itemElements[0].offsetHeight;
    const totalItems: number = heroList.length;

    // Add margin to each item for better spacing
    itemElements.forEach((item: ItemElement) => {
      item.style.marginBottom = '45px'; // Adjust spacing between items
    });

    // Recalculate total height with spacing
    const itemTotalHeight: number = itemHeight + 45; // Height + margin
    const viewportHeight: number = scrollContainer.parentElement!.offsetHeight;

    // Animation state variables
    let animationFrame: AnimationFrameID;
    let startTime: number | null = null;

    // Duration settings (in ms)
    const settings: AnimationSettings = {
      pauseDuration: 2000, // Time to pause on each item
      transitionDuration: 400, // Time to move between items
      fadeZoneSize: 0.4, // 40% of the viewport at top and bottom will be fade zones
      itemTotalHeight: itemTotalHeight,
      fullCycleDuration: (2000 + 400) * totalItems,
    };

    // Easing functions
    const easeOutBack: EasingFunction = (t: number): number => {
      const c1 = 0.15; // Reduced bounce for subtlety
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    // Simple easing function for a single bounce
    const singleBounceOut: EasingFunction = (t: number): number => {
      // Creates a single smooth bounce at the end
      if (t < 0.75) {
        // First 75% is just normal easing
        return t * (4 / 3);
      } else {
        // Last 25% includes the single bounce
        const normalized = (t - 0.75) * 4; // Scale to 0-1 range
        // Parabola that peaks at 1.08 and returns to 1.0
        return 1 + 0.08 * Math.sin(Math.PI * normalized);
      }
    };

    // Function to update opacity based on position
    const updateItemOpacity = (
      currentPos: number,
      transitionProgress: number,
      currentItemIndex: number
    ): void => {
      itemElements.forEach((item: ItemElement, index: number) => {
        const itemPos = index * settings.itemTotalHeight;
        const relativePos = itemPos - currentPos;

        // For the current active item, always maintain full opacity
        if (index === currentItemIndex) {
          item.style.opacity = '1';
          return;
        }

        // For the next item (if in transition)
        if (
          index === (currentItemIndex + 1) % totalItems &&
          transitionProgress > 0
        ) {
          item.style.opacity = Math.min(1, transitionProgress).toString();
          return;
        }

        // Item's position relative to viewport
        const normalizedPos = relativePos / viewportHeight;

        // Calculate opacity: 1 when centered, fade to 0 as it approaches edges
        let opacity = 0; // Default to invisible for items not in view

        // Only calculate opacity for nearby items to avoid flashing
        const isNearby =
          Math.abs(index - currentItemIndex) <= 2 ||
          (currentItemIndex === totalItems - 1 && index === 0);

        if (isNearby) {
          // Fade out at top of viewport
          if (normalizedPos < 0 && normalizedPos > -settings.fadeZoneSize) {
            opacity = normalizedPos / -settings.fadeZoneSize;
          }
          // Fade out at bottom of viewport
          else if (normalizedPos > 0 && normalizedPos < settings.fadeZoneSize) {
            opacity = 1 - normalizedPos / settings.fadeZoneSize;
          }
        }

        item.style.opacity = Math.max(0, Math.min(1, opacity)).toString();
      });
    };

    // Setting up the animation with pause and bounce effect
    const animateScroll = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      let elapsed = (timestamp - startTime) % settings.fullCycleDuration;

      // Determine which item we should be showing and how far through transition
      const cyclePosition =
        elapsed / (settings.pauseDuration + settings.transitionDuration);
      const currentItemIndex = Math.floor(cyclePosition) % totalItems;

      // Calculate how far into the current cycle we are (0 to 1)
      const cycleProgress =
        (elapsed % (settings.pauseDuration + settings.transitionDuration)) /
        (settings.pauseDuration + settings.transitionDuration);

      // Calculate transition progress only during transition phase
      const transitionProgress = Math.max(
        0,
        Math.min(
          1,
          (cycleProgress *
            (settings.pauseDuration + settings.transitionDuration) -
            settings.pauseDuration) /
            settings.transitionDuration
        )
      );

      // Position without bounce (base position during pause)
      let basePosition = currentItemIndex * settings.itemTotalHeight;

      // Apply transition with bounce effect
      if (transitionProgress > 0) {
        // Use predominantly the single bounce with a touch of easeOutBack
        const easeValue =
          0.8 * singleBounceOut(transitionProgress) +
          0.2 * easeOutBack(transitionProgress);

        // Calculate position with enhanced bounce
        const additionalOffset = easeValue * settings.itemTotalHeight;
        basePosition += additionalOffset;
      }

      // Special handling for loop transition (when last item transitions to first)
      if (currentItemIndex === totalItems - 1 && transitionProgress > 0) {
        // Apply smoother loop transition by pre-positioning first item
        itemElements[0].style.transform = `translateY(${
          settings.itemTotalHeight * totalItems
        }px)`;
      } else {
        // Reset first item position when not in loop transition
        itemElements[0].style.transform = '';
      }

      // Apply the transform
      scrollContainer.style.transform = `translateY(-${basePosition}px)`;

      // Update opacity of each item
      updateItemOpacity(basePosition, transitionProgress, currentItemIndex);

      animationFrame = requestAnimationFrame(animateScroll);
    };

    animationFrame = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      // Reset styles when unmounting
      itemElements.forEach((item: ItemElement) => {
        item.style.transform = '';
        item.style.opacity = '1';
      });
    };
  }, [heroList.length]);

  return (
    <div className="bg-gradient-to-b from-blue-950 to-coal-950">
      <Container size="md">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center text-center p-4 md:p-0">
            <div className="text-center mt-[7.8rem] mb-[1.25rem]">
              <Text className="!text-white !text-[3.5rem] md:!text-[5.875rem]/[6.46rem]">
                Unlock Autonomy for {/* Scrolling Text Container */}
                <div
                  className="inline-block relative overflow-hidden md:h-28 h-24 align-bottom mx-2"
                  style={{
                    width: '520px',
                    verticalAlign: 'bottom',
                  }}
                >
                  <div
                    ref={scrollRef}
                    className="absolute top-0 left-0 right-0"
                    style={{
                      willChange: 'transform', // Optimize for animations
                    }}
                  >
                    {/* Original items with additional duplicate of first item for smooth looping */}
                    {heroList.map((item, index) => (
                      <Text
                        component="div"
                        key={`item-${index}`}
                        className="!text-white !text-[3.5rem] md:!text-[5.875rem]/[6.46rem]"
                        style={{
                          transition: 'opacity 0.15s ease-out',
                          willChange: 'opacity, transform',
                        }}
                      >
                        {item}
                      </Text>
                    ))}
                    {/* Duplicate first item to help with seamless looping */}
                    <Text
                      key="item-duplicate-first"
                      component="div"
                      className="!text-white md:!text-[5.875rem]/[6.46rem]"
                      style={{
                        transition: 'opacity 0.3s ease-out',
                        willChange: 'opacity, transform',
                        position: 'absolute',
                        width: '100%',
                      }}
                    >
                      {heroList[0]}
                    </Text>
                  </div>
                </div>
              </Text>
            </div>
            <Text
              className="!text-off-white max-w-[800px] !text-[1.15rem] text-center"
              mb={32}
            >
              Lit Protocol is the decentralized network for managing keys and
              secrets. Join the builders using programmable signing and
              encryption to power AI agents, blockchain interoperability, crypto
              wallets, and user-owned data.
            </Text>

            <Group className="justify-center mb-[1rem]">
              <Button
                href={DOCS_LINK}
                target="_blank"
                rightIcon={<IconArrowNarrowRight stroke={2} />}
              >
                Read the Docs
              </Button>
              <Button variant="outline" href={CONTACT_FORM} target="_blank">
                Get In Touch
              </Button>
            </Group>
          </div>
        </div>
        <LandingPartners />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BlogCarousel />
        </div>
      </Container>
    </div>
  );
};

export default LandingHero;
