import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsSection } from '@/components/sections/stats-section';
import { stats } from '@/lib/data';

describe('StatsSection', () => {
  it('renders all 4 stat cards with the correct labels', () => {
    render(<StatsSection />);

    expect(stats).toHaveLength(4);
    stats.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it('renders the stat value for each card', () => {
    const { container } = render(<StatsSection />);

    stats.forEach((stat) => {
      expect(container.textContent).toContain(`${stat.prefix}${stat.value}${stat.suffix}`);
    });
  });
});
