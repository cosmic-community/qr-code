'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import QRCodeLib from 'qrcode';

export default function QRCodeGenerator() {
  const [content, setContent] = useState('');
  const [label, setLabel] = useState('');
  const [foregroundColor, setForegroundColor] = useState('#4f46e5');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = useCallback(async (text: string, color: string) => {
    if (!text.trim()) {
      setQrDataUrl(null);
      return;
    }

    try {
      const dataUrl = await QRCodeLib.toDataURL(text.trim(), {
        width: 512,
        margin: 2,
        color: {
          dark: color,
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error('QR generation error:', err);
      setQrDataUrl(null);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      generateQR(content, foregroundColor);
    }, 300);

    return () => clearTimeout(debounce);
  }, [content, foregroundColor, generateQR]);

  const handleSave = async () => {
    if (!content.trim()) return;

    setSaving(true);
    setSaveMessage(null);

    try {
      const response = await fetch('/api/qr-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: content.trim(),
          label: label.trim(),
          foreground_color: foregroundColor,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      setSaveMessage({ type: 'success', text: 'QR code saved! Refresh to see it below.' });

      setTimeout(() => setSaveMessage(null), 4000);
    } catch (err) {
      console.error('Save error:', err);
      setSaveMessage({ type: 'error', text: 'Failed to save QR code. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.download = `qr-code-${label.trim() || 'download'}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <section>
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Generate a QR Code
        </h1>
        <p className="mt-2 text-gray-500 text-base max-w-md mx-auto">
          Enter any URL or text below to instantly create a QR code. Customize the color, add a label, and save it.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-5">
            {/* Content Input */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Content <span className="text-red-400">*</span>
              </label>
              <input
                id="content"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="https://example.com or any text..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
              />
            </div>

            {/* Label Input */}
            <div>
              <label htmlFor="label" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Label <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="label"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. My Website, WiFi Password..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
              />
            </div>

            {/* Color Picker */}
            <div>
              <label htmlFor="color" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Foreground Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="color"
                  type="color"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer p-1"
                />
                <input
                  type="text"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={!content.trim() || saving}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm shadow-md shadow-brand-200 hover:shadow-lg hover:shadow-brand-300"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save to Cosmic
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                disabled={!qrDataUrl}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 font-semibold rounded-xl border border-gray-200 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PNG
              </button>
            </div>

            {/* Save Message */}
            {saveMessage && (
              <div
                className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium ${
                  saveMessage.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {saveMessage.type === 'success' ? (
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {saveMessage.text}
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-[280px] aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Generated QR Code"
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm14 3h.01M17 14h.01M14 17h.01" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm font-medium">
                    Your QR code will appear here
                  </p>
                </div>
              )}
            </div>
            {content.trim() && (
              <p className="mt-3 text-xs text-gray-400 text-center max-w-[280px] truncate">
                {content}
              </p>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}