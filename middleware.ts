import { chain } from "@/middlewares/chain";
import { withAuthMiddleware } from "@/middlewares/auth-middleware";
import { withI18nMiddleware } from "@/middlewares/i18n-middleware";

export default chain([withAuthMiddleware, withI18nMiddleware]);

export const config = {
  matcher: [
    "/:path((?!api|_next/static|_next/image|assets).*)",
    "/:path*{!.(png|jpg|jpeg|webp|svg|gif|ico|tiff|bmp)}",
  ],
};
