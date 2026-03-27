export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#f8fafc]">
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-[3px] border-gray-200"></div>
          <div className="absolute top-0 left-0 w-10 h-10 rounded-full border-[3px] border-t-gray-900 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>

        <p className="text-sm text-gray-500 tracking-wide">Loading</p>
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>
      </div>
    </div>
  );
}
