const ChatSkeleton = () => (
  <div className="flex w-full max-w-md flex-col p-4">
    <div className="flex-1 animate-pulse space-y-4 rounded-t-lg bg-gray-100 p-6">
      <div className="h-12 rounded-md bg-gray-300"></div>
      <div className="h-12 rounded-md bg-gray-300"></div>
      <div className="h-12 rounded-md bg-gray-300"></div>
    </div>
    <div className="flex w-full rounded-b-lg bg-white p-4">
      <div className="flex-1 rounded-l-lg border-2 border-gray-300 bg-gray-200 p-2"></div>
      <div className="h-10 w-24 rounded-r-lg bg-gray-300"></div>
    </div>
  </div>
);

export default ChatSkeleton;
