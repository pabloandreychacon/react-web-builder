export default function WebBuilderAnimation() {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Browser Window */}
      <div className="absolute inset-0 p-4">
        <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden">
          {/* Browser Header */}
          <div className="bg-gray-200 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 ml-4">
              www.yourwebsite.com
            </div>
          </div>

          {/* Animated Content */}
          <div className="p-6 space-y-4">
            {/* Header Animation */}
            <div className="animate-slideDown">
              <div className="h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded animate-pulse"></div>
            </div>

            {/* Navigation Animation */}
            <div className="flex gap-3 animate-slideDown" style={{ animationDelay: '0.3s' }}>
              <div className="h-6 w-20 bg-blue-300 rounded"></div>
              <div className="h-6 w-20 bg-blue-300 rounded"></div>
              <div className="h-6 w-20 bg-blue-300 rounded"></div>
            </div>

            {/* Content Blocks Animation */}
            <div className="grid grid-cols-2 gap-4 animate-slideUp" style={{ animationDelay: '0.6s' }}>
              <div className="h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg animate-float"></div>
              <div className="h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg animate-float" style={{ animationDelay: '0.2s' }}></div>
            </div>

            {/* Text Lines Animation */}
            <div className="space-y-2 animate-fadeIn" style={{ animationDelay: '0.9s' }}>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Code Symbols */}
      <div className="absolute top-10 right-10 text-4xl animate-bounce text-blue-500 opacity-20">&lt;/&gt;</div>
      <div className="absolute bottom-10 left-10 text-3xl animate-pulse text-purple-500 opacity-20">{ }</div>
      <div className="absolute top-1/2 left-5 text-2xl animate-spin-slow text-pink-500 opacity-20">⚡</div>
    </div>
  );
}
