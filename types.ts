export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface QRCode extends CosmicObject {
  type: 'qr-codes';
  metadata: {
    content?: string;
    label?: string;
    foreground_color?: string;
  };
}

export interface QRCodeFormData {
  content: string;
  label: string;
  foreground_color: string;
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}