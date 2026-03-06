export function LoadingSpinner() {
  return (
    <div className="flex justify-center py-8">
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
