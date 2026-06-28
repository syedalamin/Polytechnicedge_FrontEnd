import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type DecodedToken = {
  userId: string;
  email: string;
  role: string;
  exp: number;
};

function decodeToken(token: string): DecodedToken | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  // const token = request.cookies.get("accessToken")?.value;
 
  // if (!token) return NextResponse.next();

  // const decoded = decodeToken(token);
 
  // if (!decoded) return NextResponse.next();

  const response = NextResponse.next();

  // // ✅ important: lightweight user info cookie
  // response.cookies.set("user", JSON.stringify({
  //   userId: decoded.userId,
  //   role: decoded.role,
  // }));

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};