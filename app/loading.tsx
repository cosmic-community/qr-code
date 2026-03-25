export default function Loading() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <p className="text-gray-500 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}