export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      {/* Simplified loading animation */}
      <div className="relative mb-8">
        {/* Simple rotating gradient circle */}
        <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-2 border-transparent border-b-blue-400 rounded-full animate-spin animate-reverse"></div>
      </div>

      {/* Simple loading text */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">
          Loading Learning Hub
        </h2>
        <div className="flex items-center justify-center space-x-1 text-gray-400">
          <span className="animate-pulse">Please wait</span>
          <span className="animate-bounce">.</span>
          <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
        </div>
      </div>
    </div>
  );
}