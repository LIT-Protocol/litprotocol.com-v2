'use client';

import { Container, Group, Text } from '@mantine/core';
import { CONTACT_FORM, DOCS_LINK } from '@/utils/constants';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import LandingPartners from '../LandingPartners/LandingPartners';
import { Button } from '../ui/Button';
import { useEffect, useRef, useState } from 'react';
import HeroBackgroundGlow from './HeroBackgroundGlow';
// import { QuoteCarousel } from '../QuoteCarousel/QuoteCarousel';
import { BlogCarousel } from '../BlogCarousel/BlogCarousel';

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
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const animationRef = useRef<AnimationFrameID | null>(null);

  // Effect to update container width on resize
  useEffect(() => {
    const updateContainerWidth = () => {
      if (heroContentRef.current) {
        setContainerWidth(heroContentRef.current.offsetWidth);
        // Mark as initialized when we have a valid width
        setIsInitialized(true);
      }
    };

    // Initial width measurement
    updateContainerWidth();

    // Add resize listener
    window.addEventListener('resize', updateContainerWidth);

    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, []);

  // Animation effect - only runs once container is initialized
  useEffect(() => {
    if (!isInitialized) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const itemElements: ItemElement[] = Array.from(
      scrollContainer.children
    ) as ItemElement[];

    // Prevent issues if items aren't rendered yet
    if (!itemElements.length || itemElements[0].offsetHeight === 0) return;

    // Skip the duplicate item at the end when calculating
    const actualItems = itemElements.slice(0, heroList.length);

    const itemHeight: number = actualItems[0].offsetHeight;
    const totalItems: number = heroList.length;

    // Calculate responsive margin based on viewport width
    const marginPercentage = containerWidth < 768 ? 0.2 : 0.25; // 20% for mobile, 25% for desktop
    const marginValue = `${Math.max(25, itemHeight * marginPercentage)}px`;

    // Add margin to each item for better spacing
    actualItems.forEach((item: ItemElement) => {
      item.style.marginBottom = marginValue;
      // Set initial style to ensure first item is visible on load
      item.style.color = 'rgba(255, 255, 255, 0.3)'; // Default dull white
      item.style.transition =
        'color 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease-out';
    });

    // Make first item active immediately
    actualItems[0].style.color = 'rgba(255, 255, 255, 1)';
    actualItems[0].style.opacity = '1';

    // Recalculate total height with dynamic spacing
    const itemTotalHeight: number = itemHeight + parseFloat(marginValue);
    const viewportHeight: number = scrollContainer.parentElement!.offsetHeight;

    // Animation state variables
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

    // Function to update the active item's color without glow
    const updateActiveItemColor = (
      itemElement: ItemElement,
      isActive: boolean
    ): void => {
      // Only apply full color to the active item
      if (isActive) {
        itemElement.style.color = 'rgba(255, 255, 255, 1)'; // Full white for active item
      } else {
        itemElement.style.color = 'rgba(255, 255, 255, 0.3)'; // Dull white for inactive items
      }
    };

    // Function to update opacity based on position
    const updateItemOpacity = (
      currentPos: number,
      transitionProgress: number,
      currentItemIndex: number
    ): void => {
      actualItems.forEach((item: ItemElement, index: number) => {
        const itemPos = index * settings.itemTotalHeight;
        const relativePos = itemPos - currentPos;

        // For the current active item, maintain full opacity and apply active styling
        if (index === currentItemIndex) {
          item.style.opacity = '1';
          updateActiveItemColor(item, true);
          return;
        }

        // For the next item (if in transition)
        if (
          index === (currentItemIndex + 1) % totalItems &&
          transitionProgress > 0
        ) {
          item.style.opacity = Math.min(1, transitionProgress).toString();
          updateActiveItemColor(item, false);
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
        updateActiveItemColor(item, false);
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

      // Update opacity and color of each item
      updateItemOpacity(basePosition, transitionProgress, currentItemIndex);

      animationRef.current = requestAnimationFrame(animateScroll);
    };

    // Start animation immediately
    animationRef.current = requestAnimationFrame(animateScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      // Reset styles when unmounting
      actualItems.forEach((item: ItemElement) => {
        item.style.transform = '';
        item.style.opacity = '1';
        item.style.color = '';
        item.style.marginBottom = '';
      });
    };
  }, [heroList.length, containerWidth, isInitialized]);

  const getScrollContainerWidth = () => {
    // Reduce width for mobile to better match parent width
    const mobileWidth = Math.min(containerWidth * 0.75, 280); // Smaller width for mobile
    const desktopWidth = Math.min(containerWidth * 0.8, 520);
    return containerWidth > 768 ? desktopWidth : mobileWidth;
  };

  // Calculate responsive margin for scroll items
  const getScrollItemMargin = () => {
    return containerWidth < 768 ? '.15rem' : '1.5rem';
  };

  return (
    <div className="bg-gradient-to-b from-blue-950 to-coal-950 relative overflow-hidden">
      <HeroBackgroundGlow />
      <div className="absolute -left-[12rem] -top-[4rem] z-0 hidden md:block pointer-events-none w-[35rem] opacity-70">
        <img
          src="/textures/hero-left.png"
          alt=""
          className="w-full h-auto"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="absolute -right-[10rem] md:-right-[16rem] -top-[8rem] -rotate-40 md:rotate-0 md:-top-[2rem] z-0 pointer-events-none w-[30rem] md:w-[40rem] opacity-70">
        <img
          src="/textures/hero-right.png"
          alt=""
          className="w-full h-auto"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <Container size="md">
        <div className="flex justify-center items-center relative">
          <div
            ref={heroContentRef}
            className="flex flex-col items-start md:items-center text-center p-4 md:p-0"
          >
            <div className="z-1 text-left md:text-center mt-[2rem] md:mt-[7.8rem] mb-[1.25rem]">
              <Text
                className="!text-[2.5rem] md:!text-[5.875rem]/[6.46rem]"
                style={{
                  color: 'rgba(255, 255, 255, 1)',
                  // Add line height control for mobile specifically
                  lineHeight: containerWidth > 768 ? '6.46rem' : '3rem',
                }}
              >
                <span className="inline">Unlock Autonomy for</span>{' '}
                {/* Scrolling Text Container */}
                <span
                  className="inline-block relative overflow-hidden h-16 sm:h-20 lg:h-28 mx-0"
                  style={{
                    width: getScrollContainerWidth(),
                    maxWidth: '100%',
                    // Change vertical alignment approach for mobile
                    verticalAlign: containerWidth > 768 ? 'bottom' : 'top',
                    // Add some negative margin to adjust position on mobile
                    marginBottom: containerWidth > 768 ? '0' : '-0.5rem',
                    textAlign: containerWidth > 768 ? 'center' : 'left',
                  }}
                >
                  <span
                    ref={scrollRef}
                    className="absolute top-0 left-0 w-full"
                    style={{
                      willChange: 'transform', // Optimize for animations
                      height: 'auto', // Ensure content height is respected
                      transform: 'translateY(0)', // Start at first item
                    }}
                  >
                    {/* Original items with responsive text sizing */}
                    {heroList.map((item, index) => (
                      <span
                        key={`item-${index}`}
                        className="block !text-[2.5rem] md:!text-[5.875rem]/[6.46rem]"
                        style={{
                          willChange: 'opacity, transform, color',
                          marginBottom: getScrollItemMargin(),
                          opacity: index === 0 ? 1 : 0.3,
                          color:
                            index === 0
                              ? 'rgba(255, 255, 255, 1)'
                              : 'rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        {item}
                      </span>
                    ))}

                    {/* Duplicate first item for seamless looping */}
                    <span
                      key="item-duplicate-first"
                      className="block !text-[2.5rem] md:!text-[5.875rem]/[6.46rem]"
                      style={{
                        willChange: 'opacity, transform, color',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        color: 'rgba(255, 255, 255, 0.3)',
                        opacity: 0,
                      }}
                    >
                      {heroList[0]}
                    </span>
                  </span>
                </span>
              </Text>
            </div>
            <Text
              className="!text-off-white w-full z-1 md:w-full max-w-[800px] !text-[1.15rem] text-left md:text-center"
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
                rel="noopener noreferrer"
                rightIcon={<IconArrowNarrowRight stroke={2} />}
              >
                Read the Docs
              </Button>
              <Button
                variant="outline"
                href={CONTACT_FORM}
                target="_blank"
                rel="noopener noreferrer"
              >
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
