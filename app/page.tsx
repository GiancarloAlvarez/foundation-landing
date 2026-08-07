import { HeroSection } from '@/components/sections/hero-section';
import { StatsSection } from '@/components/sections/stats-section';
import { ActivitiesSection } from '@/components/sections/activities-section';
import { ProgramsSection } from '@/components/sections/programs-section';
import { AlliesSection } from '@/components/sections/allies-section';
import { CtaSection } from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ActivitiesSection />
      <ProgramsSection />
      <AlliesSection />
      <CtaSection />
    </>
  );
}
