import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../backend/config/db";
import { login } from "../../../../backend/modules/auth/login/controller";
import { handleError } from "../../../../backend/middleware/error";

export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    return await login(req);
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};
