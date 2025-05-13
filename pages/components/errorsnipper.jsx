const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-3 text-lg font-medium">Loading...</span>
      </div>
    )
  }
  
  export default LoadingSpinner