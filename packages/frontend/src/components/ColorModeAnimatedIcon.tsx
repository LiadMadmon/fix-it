import { CSSProperties } from 'react';
import { animated, useSpring } from 'react-spring';
import { useColorScheme, useTheme } from '@mui/material';

const IconsStyle = {
  dark: {
    r: 9,
    transform: 'rotate(40deg)',
    cx: 12,
    cy: 4,
    opacity: 0
  },
  light: {
    r: 5,
    transform: 'rotate(90deg)',
    cx: 30,
    cy: 0,
    opacity: 1
  },
  springConfig: { mass: 4, tension: 250, friction: 35 }
};

export const ColorModeAnimatedIcon = () => {
  const { mode } = useColorScheme();
  const { r, transform, cx, cy, opacity } = IconsStyle[mode === 'light' ? 'dark' : 'light'];

  const svgContainerProps = useSpring({
    transform,
    config: IconsStyle.springConfig
  });
  const centerCircleProps = useSpring({ r, config: IconsStyle.springConfig });
  const maskedCircleProps = useSpring({
    cx,
    cy,
    config: IconsStyle.springConfig
  });
  const linesProps = useSpring({ opacity, config: IconsStyle.springConfig });

  return (
    <animated.svg
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{
        cursor: 'pointer',
        ...svgContainerProps
      }}
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="myMask2">
        <rect fill="white" height="100%" width="100%" x="0" y="0" />
        <animated.circle fill="black" r="9" style={maskedCircleProps as CSSProperties} />
      </mask>

      <animated.circle
        cx="12"
        cy="12"
        fill="black"
        mask="url(#myMask2)"
        style={centerCircleProps as CSSProperties}
      />
      <animated.g stroke="currentColor" style={linesProps}>
        <line x1="12" x2="12" y1="1" y2="3" />
        <line x1="12" x2="12" y1="21" y2="23" />
        <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
        <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
        <line x1="1" x2="3" y1="12" y2="12" />
        <line x1="21" x2="23" y1="12" y2="12" />
        <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
        <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
      </animated.g>
    </animated.svg>
  );
};
