import React, { CSSProperties, ReactNode, HTMLAttributes } from 'react';

type AnimationMode = 'auto-rotate' | 'rotate-on-hover' | 'stop-rotate-on-hover';

interface BorderRotateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  className?: string;
  animationMode?: AnimationMode;
  animationSpeed?: number;
  gradientColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  backgroundColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  style?: CSSProperties;
}

const defaultGradientColors = {
  primary: '#584827',
  secondary: '#c7a03c',
  accent: '#f9de90'
};

const BorderRotate: React.FC<BorderRotateProps> = ({
  children,
  className = '',
  animationMode = 'auto-rotate',
  animationSpeed = 5,
  gradientColors = defaultGradientColors,
  backgroundColor = '#2d230f',
  borderWidth = 2,
  borderRadius = 20,
  style = {},
  ...props
}) => {
  const getAnimationClass = () => {
    switch (animationMode) {
      case 'auto-rotate':
        return 'gradient-border-auto';
      case 'rotate-on-hover':
        return 'gradient-border-hover';
      case 'stop-rotate-on-hover':
        return 'gradient-border-stop-hover';
      default:
        return '';
    }
  };

  const outerStyle: CSSProperties = {
    '--animation-duration': `${animationSpeed}s`,
    padding: `${borderWidth}px`,
    borderRadius: `${borderRadius}px`,
    background: `conic-gradient(
      from var(--gradient-angle, 0deg),
      ${gradientColors.primary} 0%,
      ${gradientColors.secondary} 27%,
      ${gradientColors.accent} 30%,
      ${gradientColors.secondary} 33%,
      ${gradientColors.primary} 40%,
      ${gradientColors.primary} 50%,
      ${gradientColors.secondary} 77%,
      ${gradientColors.accent} 80%,
      ${gradientColors.secondary} 83%,
      ${gradientColors.primary} 90%,
      ${gradientColors.primary} 100%
    )`,
    ...style,
  } as CSSProperties;

  const innerStyle: CSSProperties = {
    backgroundColor: backgroundColor,
    borderRadius: `calc(${borderRadius}px - ${borderWidth}px)`,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  };

  return (
    <div
      className={`gradient-border-component ${getAnimationClass()} ${className}`}
      style={outerStyle}
      {...props}
    >
      <div style={innerStyle}>
        {children}
      </div>
    </div>
  );
};

export { BorderRotate };
