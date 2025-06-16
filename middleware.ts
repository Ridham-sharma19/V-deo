import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import Video from "./models/Video";

export default withAuth(
    function middleware(){
        return NextResponse.next();

    },
    { callbacks: {
   authorized({ req , token }) {
    const {pathname}=req.nextUrl;
    if(pathname.startsWith("/api/auth")||pathname==="/login"||pathname==="/register"){
        return true;

    }
    if(pathname==="/"||pathname.startsWith("/api/videos")){
        return true;
    }
    return !!token;


   }
 }}
)

export const config = {
  matcher: [
    // Match all request paths except:
    // - _next/static      → static files (e.g., JS, CSS)
    // - _next/image       → optimized images
    // - favicon.ico       → browser tab icon
    // - public/           → static public assets (e.g., /public/images)
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
