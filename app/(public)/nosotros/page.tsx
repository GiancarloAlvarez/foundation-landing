import { NosotrosClient } from './nosotros-client';
import { prisma } from '@/lib/db';

export default async function NosotrosPage() {
  const [about, missionValues, historyStats, teamMembers] = await Promise.all([
    prisma.aboutContent.upsert({ where: { id: 'main' }, update: {}, create: { id: 'main' } }),
    prisma.missionValue.findMany({ orderBy: { order: 'asc' } }),
    prisma.historyStat.findMany({ orderBy: { order: 'asc' } }),
    prisma.teamMember.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <NosotrosClient
      about={about}
      missionValues={missionValues}
      historyStats={historyStats}
      teamMembers={teamMembers}
    />
  );
}
