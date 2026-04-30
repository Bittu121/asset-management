import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../backend/config/db";
import { resetPassword } from "../../../../backend/modules/auth/reset-password/controller";
import { handleError } from "../../../../backend/middleware/error";

export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const result = await resetPassword(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};
