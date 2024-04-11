"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-red-500 px-4 py-2 text-white">
      <div className="text-center">
        <h2 className="mb-4 text-4xl font-bold">Something went wrong!</h2>
        <p className="mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="rounded bg-white px-6 py-2 text-lg font-bold text-red-500"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
