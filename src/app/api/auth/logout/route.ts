import { NextRequest, NextResponse } from "next/server";
import { logout } from "../../../../backend/modules/auth/logout/controller";
import { handleError } from "../../../../backend/middleware/error";

export const POST = async (req: NextRequest) => {
  try {
    return await logout(req);
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};
