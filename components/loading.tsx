import { Suspense } from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4 text-center text-foreground">
        <div className="relative h-2 w-64 overflow-hidden rounded-full bg-gray-300">
          <div className="animate-loading-bar absolute left-0 top-0 h-full w-full bg-primary"></div>
        </div>
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

const SuspenseLoading = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export { SuspenseLoading, Loading };
