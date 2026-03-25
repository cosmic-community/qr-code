'use client';

import { useState, useEffect } from 'react';
import QRCodeLib from 'qrcode';
import { QRCode } from '@/types';

interface QRCodeCardProps {
  qrCode: QRCode;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export default function QRCodeCard({ qrCode, onDelete, isDeleting }: QRCodeCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const content = qrCode.metadata?.content || '';
  const label = qrCode.metadata?.label || '';
  const foregroundColor = qrCode.metadata?.foreground_color || '#000000';

  useEffect(() => {
    if (!content) return;

    QRCodeLib.toDataURL(content, {
      width: 400,
      margin: 2,
      color: {
        dark: foregroundColor,
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR generation error:', err));
  }, [content, foregroundColor]);

  const handleDownload = () => {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.download = `qr-code-${label || qrCode.slug}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-md shadow-gray-100/50 hover:shadow-lg hover:shadow-gray-200/50 transition-all group overflow-hidden">
      {/* QR Preview */}
      <div className="p-5 pb-3 flex justify-center">
        <div className="w-40 h-40 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`QR Code for ${label || content}`}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="px-5 pb-2">
        {label && (
          <h3 className="font-semibold text-gray-900 text-sm truncate">{label}</h3>
        )}
        <p className="text-xs text-gray-400 truncate mt-0.5" title={content}>
          {content}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div
            className="w-3 h-3 rounded-full border border-gray-200"
            style={{ backgroundColor: foregroundColor }}
            title={foregroundColor}
          />
          <span className="text-xs text-gray-400 font-mono">{foregroundColor}</span>
          <span className="text-xs text-gray-300 ml-auto">{formatDate(qrCode.created_at)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex border-t border-gray-100 mt-3">
        <button
          onClick={handleDownload}
          disabled={!qrDataUrl}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </button>
        <div className="w-px bg-gray-100" />
        <button
          onClick={() => onDelete(qrCode.id)}
          disabled={isDeleting}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-red-500 hover:bg-red-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isDeleting ? (
            <>
              <div className="w-3 h-3 border-2 border-red-200 border-t-red-500 rounded-full animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
}