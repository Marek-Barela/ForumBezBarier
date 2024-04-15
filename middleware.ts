import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/post/:path*", "/popular"],
  ignoredRoutes: ["/api/posts", "/api/posts/:path*"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/(api|trpc)(.*)"],
};
