import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { prisma } from '@/lib/db';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'main' } });

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton whatsappNumber={settings?.whatsappNumber} />
    </>
  );
}
