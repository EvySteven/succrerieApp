export default function ProductCardSkeleton() {
  return (
    <div
      className="bg-white rounded-3xl overflow-hidden animate-pulse"
      style={{ border: '1.5px solid rgba(255,107,157,0.1)' }}
    >
      <div className="aspect-square bg-pink-50" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-pink-50 rounded-full w-1/3" />
        <div className="h-4 bg-pink-50 rounded-full w-4/5" />
        <div className="h-4 bg-pink-50 rounded-full w-2/3" />
        <div className="flex justify-between pt-2">
          <div className="h-6 bg-pink-50 rounded-full w-16" />
          <div className="h-9 bg-pink-50 rounded-2xl w-24" />
        </div>
      </div>
    </div>
  );
}
