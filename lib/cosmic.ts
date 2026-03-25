import { createBucketClient } from '@cosmicjs/sdk';
import { QRCode, hasStatus } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getQRCodes(): Promise<QRCode[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'qr-codes' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    return (response.objects as QRCode[]).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch QR codes');
  }
}

export async function createQRCode(data: {
  title: string;
  content: string;
  label: string;
  foreground_color: string;
}): Promise<QRCode> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'qr-codes',
      title: data.title,
      metadata: {
        content: data.content,
        label: data.label,
        foreground_color: data.foreground_color,
      },
    });

    return response.object as QRCode;
  } catch (error) {
    console.error('Error creating QR code:', error);
    throw new Error('Failed to create QR code');
  }
}

export async function deleteQRCode(id: string): Promise<void> {
  try {
    await cosmic.objects.deleteOne(id);
  } catch (error) {
    console.error('Error deleting QR code:', error);
    throw new Error('Failed to delete QR code');
  }
}