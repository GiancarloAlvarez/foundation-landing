import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/header';
import { navLinks } from '@/lib/data';

describe('Header', () => {
  it('renders the FUMABLAC logo text', () => {
    render(<Header />);

    expect(screen.getByText('FUMABLAC')).toBeInTheDocument();
    expect(screen.getByText('Fundación Mamá Blanca')).toBeInTheDocument();
  });

  it('renders all navigation links from the navLinks array', () => {
    render(<Header />);

    navLinks.forEach((link) => {
      expect(screen.getAllByText(link.label).length).toBeGreaterThan(0);
    });
  });

  it('renders a link with the correct href for every navLink', () => {
    render(<Header />);

    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    navLinks.forEach((link) => {
      expect(hrefs).toContain(link.href);
    });
  });
});
