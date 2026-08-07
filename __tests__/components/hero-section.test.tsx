import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/sections/hero-section';

describe('HeroSection', () => {
  it('renders the heading text "Transformando vidas"', () => {
    render(<HeroSection />);

    expect(screen.getByRole('heading', { name: /Transformando vidas/ })).toBeInTheDocument();
  });

  it('renders the two CTA buttons', () => {
    render(<HeroSection />);

    expect(
      screen.getByRole('link', { name: /Conoce nuestros programas/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contáctanos/i })).toBeInTheDocument();
  });
});
