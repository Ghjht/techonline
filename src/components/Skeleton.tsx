export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div className="aspect-square bg-gray-200 dark:bg-gray-800 animate-shimmer" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/3 animate-shimmer" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-shimmer" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 animate-shimmer" />
        <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded-lg mt-3 animate-shimmer" />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-6 animate-shimmer" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl animate-shimmer" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 animate-shimmer" />
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-shimmer" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32 animate-shimmer" />
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-40 animate-shimmer" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded animate-shimmer" />
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded animate-shimmer" />
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3 animate-shimmer" />
          </div>
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
