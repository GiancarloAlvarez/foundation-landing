import { HeroSection } from '@/components/sections/hero-section';
import { StatsSection } from '@/components/sections/stats-section';
import { ActivitiesSection } from '@/components/sections/activities-section';
import { ProgramsSection } from '@/components/sections/programs-section';
import { AlliesSection } from '@/components/sections/allies-section';
import { CtaSection } from '@/components/sections/cta-section';
import { prisma } from '@/lib/db';

export default async function HomePage() {
  const [settings, stats, activities, programs, allies] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: 'main' } }),
    prisma.stat.findMany({ orderBy: { order: 'asc' } }),
    prisma.activity.findMany({ orderBy: { order: 'asc' }, take: 3 }),
    prisma.program.findMany({ orderBy: { order: 'asc' }, take: 3 }),
    prisma.ally.findMany({ orderBy: { order: 'asc' }, take: 5 }),
  ]);

  return (
    <>
      <HeroSection settings={settings} />
      <StatsSection stats={stats} />
      <ActivitiesSection activities={activities} />
      <ProgramsSection programs={programs} />
      <AlliesSection allies={allies} />
      <CtaSection />
    </>
  );
}
