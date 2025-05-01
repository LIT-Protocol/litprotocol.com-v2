import { Button as MantineButton, ButtonProps } from '@mantine/core';
import { ReactNode } from 'react';

type CustomButtonProps = ButtonProps & {
  variant?: 'primary' | 'outline';
  rightIcon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'submit' | 'button' | 'reset';
};

export function Button({
  variant = 'primary',
  className,
  rightIcon,
  href,
  target,
  rel,
  type = 'button',
  ...props
}: CustomButtonProps) {
  // Define styles with !important to force them
  const variantClasses = {
    primary: {
      root: '!bg-gradient-to-r !from-lit-orange !to-burgundy-500',
      label: '!text-white',
      section: '!text-white',
    },
    outline: {
      root: '!border !border-white !bg-transparent !py-1 !px-3',
      label: '!text-white',
      section: '!text-white',
    },
  };

  // Use inline styles for the gradient as a fallback
  const inlineStyles = variant === 'primary' 
    ? { background: 'linear-gradient(to right, var(--lit-orange, #FF6B00), var(--burgundy-500, #800020))', padding: '.3rem .875rem' }
    : { border: '1px solid white', background: 'transparent' };

  return (
    <MantineButton
      unstyled
      type={href ? undefined : type}  // Only use type when not an anchor
      component={href ? 'a' : 'button'} // Explicitly set component
      href={href}
      target={href ? target : undefined}
      rel={href && target === '_blank' ? 'noopener noreferrer' : rel}
      className={`group btn-hover-effect rounded-md font-medium py-2 px-3 relative ${
        variantClasses[variant].root
      } ${className || ''}`}
      style={inlineStyles}
      {...props}
    >
      <div className="flex items-center justify-center">
        <span className={`leading-normal ${variantClasses[variant].label}`}>
          {props.children}
        </span>
        {rightIcon && (
          <span
            className={`ml-2 flex items-center transition-transform duration-300 group-hover:translate-x-1 ${variantClasses[variant].section}`}
          >
            {rightIcon}
          </span>
        )}
      </div>
    </MantineButton>
  );
}