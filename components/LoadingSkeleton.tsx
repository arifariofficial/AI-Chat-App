export default function LoadingSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col items-center justify-center space-y-3 p-4">
      <div className="flex w-full animate-pulse flex-col space-y-4">
        <div className="h-10 rounded bg-gray-300"></div> {/* Email input */}
        <div className="h-10 rounded bg-gray-300"></div> {/* Password input */}
        <div className="h-12 rounded-md bg-gray-400"></div>{" "}
        {/* Sign-in button */}
      </div>
    </div>
  );
}
