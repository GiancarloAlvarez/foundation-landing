import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/footer';

describe('Footer', () => {
  it('renders the foundation name', () => {
    render(<Footer />);

    expect(screen.getByText('FUMABLAC')).toBeInTheDocument();
    expect(screen.getAllByText(/Fundación Mamá Blanca/).length).toBeGreaterThan(0);
  });

  it('renders the contact information', () => {
    render(<Footer />);

    expect(screen.getByText(/Av\. Independencia/)).toBeInTheDocument();
    expect(screen.getByText('+1 (809) 555-0148')).toBeInTheDocument();
    expect(screen.getByText('contacto@fumablac.org')).toBeInTheDocument();
  });

  it('renders the copyright text', () => {
    render(<Footer />);

    expect(screen.getByText(/Todos los derechos reservados/)).toBeInTheDocument();
  });
});
