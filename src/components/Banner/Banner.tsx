import React from "react";

interface BannerProps {
  message: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

const Banner: React.FC<BannerProps> = ({
  message,
  backgroundColor = "bg-lit-red",
  textColor = "text-white",
}) => {
  return (
    <div
      className={`w-full ${backgroundColor} ${textColor} py-2 px-4 text-center text-sm font-medium`}
    >
      {message}
    </div>
  );
};

export default Banner;
