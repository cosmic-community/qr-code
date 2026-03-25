'use client';

import { useState } from 'react';
import { QRCode } from '@/types';
import QRCodeCard from '@/components/QRCodeCard';

interface SavedQRCodesProps {
  initialCodes: QRCode[];
}

export default function SavedQRCodes({ initialCodes }: SavedQRCodesProps) {
  const [codes, setCodes] = useState<QRCode[]>(initialCodes);
  const [deleting, setDeleting] = useState<string | null>(null);

  if (codes.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Saved QR Codes</h2>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No saved QR codes yet</p>
          <p className="text-gray-400 text-sm mt-1">Generate a QR code above and save it to see it here.</p>
        </div>
      </section>
    );
  }

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const response = await fetch(`/api/qr-codes?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      setCodes((prev) => prev.filter((code) => code.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete QR code. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Saved QR Codes</h2>
        <span className="text-sm text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">
          {codes.length} {codes.length === 1 ? 'code' : 'codes'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {codes.map((code) => (
          <QRCodeCard
            key={code.id}
            qrCode={code}
            onDelete={handleDelete}
            isDeleting={deleting === code.id}
          />
        ))}
      </div>
    </section>
  );
}