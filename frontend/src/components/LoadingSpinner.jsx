const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <span className="ml-3 text-blue-500 text-center">Loading data...</span>
    </div>
  );
};

export default LoadingSpinner;
