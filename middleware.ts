// middlewares.ts

import { chain } from "@/middlewares/chain";
import { withAuthMiddleware } from "@/middlewares/auth-middleware";
import { withI18nMiddleware } from "@/middlewares/i18n-middleware";

export default chain([withI18nMiddleware, withAuthMiddleware]);

export const config = {
  matcher: [
    "/:path((?!api|_next/static|_next/image|assets).*)",
    "/:path*{!.(png|jpg|jpeg|webp|svg|gif|ico|tiff|bmp)}",
  ],
};
