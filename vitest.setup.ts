import '@testing-library/jest-dom/vitest';
import { vi, afterEach } from 'vitest';
import React from 'react';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

vi.mock('framer-motion', () => {
  const React = require('react') as typeof import('react');

  const createMotionComponent = (tag: string) =>
    React.forwardRef<HTMLElement, any>((props: any, ref: any) => {
      const {
        children,
        initial,
        animate,
        exit,
        transition,
        variants,
        custom,
        whileHover,
        whileInView,
        whileTap,
        viewport,
        layoutId,
        layout,
        ...rest
      } = props;
      return React.createElement(tag, { ref, ...rest }, children);
    });

  const motion = new Proxy(
    {},
    {
      get: (_target: any, tag: string) => createMotionComponent(tag),
    }
  );

  return {
    __esModule: true,
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => ({ get: () => 0 }),
    useSpring: () => ({ get: () => 0 }),
    useReducedMotion: () => false,
    useMotionValue: (initialValue: any) => ({ get: () => initialValue }),
    useMotionValueEvent: () => undefined,
    useAnimation: () => ({ start: () => Promise.resolve(), stop: () => {}, set: () => {} }),
    useAnimationControls: () => ({ start: () => Promise.resolve(), stop: () => {}, set: () => {} }),
    animate: () => ({ stop: () => {} }),
    useInView: () => [null, true],
  };
});

vi.mock('next/image', () => {
  const React = require('react') as typeof import('react');

  const MockImage = (props: any) => {
    const { fill, priority, sizes, src, alt, className, style, ...rest } = props;
    return React.createElement('img', { src, alt, className, style, ...rest });
  };

  return {
    __esModule: true,
    default: MockImage,
  };
});

vi.mock('next/link', () => {
  const React = require('react') as typeof import('react');

  const MockLink = ({ children, href, ...rest }: any) =>
    React.createElement('a', { href, ...rest }, children);

  return {
    __esModule: true,
    default: MockLink,
  };
});

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: null, inView: true }),
  InView: ({ children }: any) => children({ ref: null, inView: true }),
}));

vi.mock('react-countup', () => {
  const React = require('react') as typeof import('react');

  return {
    __esModule: true,
    default: ({ end }: { end: number }) => React.createElement('span', null, end),
  };
});
