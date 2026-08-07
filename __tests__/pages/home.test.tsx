import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the HeroSection', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: /Transformando vidas/ })).toBeInTheDocument();
  });

  it('renders the StatsSection', () => {
    render(<HomePage />);

    expect(screen.getByText('Personas beneficiadas')).toBeInTheDocument();
  });

  it('renders the ActivitiesSection', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: 'Actividades Recientes' })).toBeInTheDocument();
  });

  it('renders the ProgramsSection', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: 'Nuestros Programas' })).toBeInTheDocument();
  });

  it('renders the AlliesSection', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: 'Nos apoyan' })).toBeInTheDocument();
  });

  it('renders the CtaSection', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: '¿Quieres ser parte del cambio?' })).toBeInTheDocument();
  });
});
