"use client";

import { spinner } from "./spinner";

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="ml-4 flex h-[24px] flex-1 flex-row items-center space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  );
}
