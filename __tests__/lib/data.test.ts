import { describe, it, expect } from 'vitest';
import { stats, programs, activities, navLinks } from '@/lib/data';

describe('lib/data', () => {
  it('exports 4 stats', () => {
    expect(stats).toHaveLength(4);
    stats.forEach((stat) => {
      expect(stat.label).toBeTruthy();
      expect(typeof stat.value).toBe('number');
    });
  });

  it('exports 3 programs', () => {
    expect(programs).toHaveLength(3);
    programs.forEach((program) => {
      expect(program.id).toBeTruthy();
      expect(program.title).toBeTruthy();
    });
  });

  it('exports 3 activities', () => {
    expect(activities).toHaveLength(3);
    activities.forEach((activity) => {
      expect(activity.title).toBeTruthy();
    });
  });

  it('exports navLinks with the correct paths', () => {
    const paths = navLinks.map((link) => link.href);

    expect(paths).toEqual(['/', '/nosotros', '/programas', '/galeria', '/evidencias', '/transparencia', '/aliados']);
    navLinks.forEach((link) => {
      expect(link.href).toMatch(/^\//);
      expect(link.label).toBeTruthy();
    });
  });
});
