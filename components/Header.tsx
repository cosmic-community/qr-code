export default function Header() {
  return (
    <header className="border-b border-gray-200/60 bg-white/60 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center shadow-md shadow-brand-200 group-hover:shadow-lg group-hover:shadow-brand-300 transition-shadow">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm14 3h.01M17 14h.01M14 17h.01M14 14h3v3h-3v-3zm0 3h.01"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              QR Code Generator
            </span>
          </a>
          <p className="hidden sm:block text-sm text-gray-400 font-medium">
            Generate · Save · Share
          </p>
        </div>
      </div>
    </header>
  );
}