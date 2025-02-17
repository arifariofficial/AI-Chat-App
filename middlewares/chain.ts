import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

export function chain(
  functions: MiddlewareFactory[],
  index = 0,
): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);

    // Wrap the middleware to include debugging
    return async (request, event, response) => {
      const result = await current(next)(request, event, response);

      return result;
    };
  }

  // Final step in the chain
  return (
    _request: NextRequest,
    _event: NextFetchEvent,
    response: NextResponse,
  ) => {
    return response;
  };
}
