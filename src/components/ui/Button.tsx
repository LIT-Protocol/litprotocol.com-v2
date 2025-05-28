import { Button as MantineButton, ButtonProps } from '@mantine/core';
import { ReactNode, CSSProperties } from 'react';

type CustomButtonProps = ButtonProps & {
  variant?: 'primary' | 'outline';
  rightIcon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'submit' | 'button' | 'reset';
  style?: CSSProperties;
};

export function Button({
  variant = 'primary',
  className,
  rightIcon,
  href,
  target,
  rel,
  type = 'button',
  style = {},
  ...props
}: CustomButtonProps) {
  // Define default styles for variants that can be overridden
  const variantStyles = {
    primary: {
      root: {
        background:
          'linear-gradient(to right,oklch(53.51% 0.163 39.51), oklch(43.99% 0.16 32.25))',
        padding: '.3rem .875rem',
      },
      text: {
        color: 'white',
      },
      icon: {
        color: 'white',
      },
    },
    outline: {
      root: {
        background: 'transparent',
        boxShadow: 'inset 0 0 0 1px white',
        padding: '.3rem .875rem',
      },
      text: {
        color: 'white',
      },
      icon: {
        color: 'white',
      },
    },
  };

  // Merge the variant styles with any custom styles
  const mergedRootStyle = {
    ...variantStyles[variant].root,
    ...style,
  };

  // Extract text and icon styles - fixed to use the style prop properly
  const textStyle =
    style && 'color' in style
      ? { color: style.color }
      : variantStyles[variant].text;
  const iconStyle =
    style && 'color' in style
      ? { color: style.color }
      : variantStyles[variant].icon;

  return (
    <MantineButton
      unstyled
      type={href ? undefined : type}
      component={href ? 'a' : 'button'}
      href={href}
      target={href ? target : undefined}
      rel={href && target === '_blank' ? 'noopener noreferrer' : rel}
      className={`group btn-hover-effect rounded-md font-medium py-2 px-3 relative ${
        className || ''
      }`}
      style={mergedRootStyle}
      {...props}
    >
      <div className="flex items-center justify-center">
        <span className="leading-normal" style={textStyle}>
          {props.children}
        </span>
        {rightIcon && (
          <span
            className="ml-2 flex items-center transition-transform duration-300 group-hover:translate-x-1"
            style={iconStyle}
          >
            {rightIcon}
          </span>
        )}
      </div>
    </MantineButton>
  );
}
