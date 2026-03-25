import QRCodeGenerator from '@/components/QRCodeGenerator';
import SavedQRCodes from '@/components/SavedQRCodes';
import { getQRCodes } from '@/lib/cosmic';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const savedCodes = await getQRCodes();

  return (
    <div className="space-y-12">
      <QRCodeGenerator />
      <SavedQRCodes initialCodes={savedCodes} />
    </div>
  );
}