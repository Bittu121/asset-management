import { NextRequest, NextResponse } from "next/server";
import { logoutService } from "./service";
import { verifyAccessToken } from "../../../config/jwt";

export const logout = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("accessToken")?.value;

    let userId: string | undefined;

    if (token) {
      const decoded: any = verifyAccessToken(token);
      userId = decoded.id;
    }

    await logoutService(userId);

    const res = NextResponse.json({ message: "Logout successful" });

    // Clear cookies
    res.cookies.set("accessToken", "", { maxAge: 0 });
    res.cookies.set("refreshToken", "", { maxAge: 0 });

    return res;
  } catch {
    const res = NextResponse.json({ message: "Logout successful" });

    res.cookies.set("accessToken", "", { maxAge: 0 });
    res.cookies.set("refreshToken", "", { maxAge: 0 });

    return res;
  }
};
