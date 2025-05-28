'use client';

import Lottie from 'lottie-react';

const LottieWrapper = ({ animationData }: { animationData: object }) => {
  return <Lottie animationData={animationData} loop />;
};

export default LottieWrapper;