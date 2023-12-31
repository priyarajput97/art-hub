import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest, res: NextResponse) {
  const cookie = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (!cookie) {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  if (url.pathname.includes("api")) {
    const bearerToken = req.headers.get("authorization") as string;
    if (!bearerToken) {
      return new NextResponse(
        JSON.stringify({ errorMessage: "Unauthorized request." }),
        { status: 401 }
      );
    }

    const token = bearerToken?.split(" ")[1];
    if (!token) {
      return new NextResponse(
        JSON.stringify({ errorMessage: "Unauthorized request." }),
        { status: 401 }
      );
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jose.jwtVerify(token, secret);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ errorMessage: "Unauthorized request." }),
        { status: 401 }
      );
    }
  }
}

export const config = {
  matcher: [
    "/((?!api/auth/signin|api/auth/signup|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};
