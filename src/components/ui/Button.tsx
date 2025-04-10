import { Button as MantineButton, ButtonProps } from '@mantine/core';
import { ReactNode } from 'react';

// Extend the props type to include anchor-specific properties
type CustomButtonProps = ButtonProps & {
  variant?: 'primary' | 'outline';
  rightIcon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
};

export function Button({
  variant = 'primary',
  className,
  rightIcon,
  href,
  target,
  rel,
  ...props
}: CustomButtonProps) {
  const variantClasses = {
    primary: {
      root: 'bg-gradient-to-r from-lit-orange to-burgundy-500',
      label: 'text-white',
      section: 'text-white',
    },
    outline: {
      root: 'outline-1 outline-white outline-solid bg-transparent !py-1 px-3',
      label: 'text-white',
      section: 'text-white',
    },
  };

  // If href is provided, set component to "a"
  const buttonProps = href
    ? {
        component: 'a' as const,
        href,
        target,
        rel: rel || (target === '_blank' ? 'noopener noreferrer' : undefined),
      }
    : {};

  return (
    <MantineButton
      unstyled
      className={`group btn-hover-effect rounded-md font-medium py-[0.35rem] px-3 relative ${
        variantClasses[variant].root
      } ${className || ''}`}
      {...buttonProps}
      {...props}
    >
      <div className="flex items-center justify-center">
        <span className={`leading-normal ${variantClasses[variant].label}`}>
          {props.children}
        </span>
        {rightIcon && (
          <span
            className={`ml-2 flex items-center icon-right-animate transition-transform duration-300 group-hover:translate-x-1 ${variantClasses[variant].section}`}
          >
            {rightIcon}
          </span>
        )}
      </div>
    </MantineButton>
  );
}
