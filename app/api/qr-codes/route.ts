import { NextRequest, NextResponse } from 'next/server';
import { createQRCode, getQRCodes, deleteQRCode } from '@/lib/cosmic';

export async function GET() {
  try {
    const codes = await getQRCodes();
    return NextResponse.json({ codes });
  } catch (error) {
    console.error('Error fetching QR codes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch QR codes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, label, foreground_color } = body as {
      content: string;
      label: string;
      foreground_color: string;
    };

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const title = label?.trim() || content.substring(0, 50);

    const qrCode = await createQRCode({
      title,
      content: content.trim(),
      label: label?.trim() || '',
      foreground_color: foreground_color || '#000000',
    });

    return NextResponse.json({ qrCode }, { status: 201 });
  } catch (error) {
    console.error('Error creating QR code:', error);
    return NextResponse.json(
      { error: 'Failed to create QR code' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await deleteQRCode(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting QR code:', error);
    return NextResponse.json(
      { error: 'Failed to delete QR code' },
      { status: 500 }
    );
  }
}