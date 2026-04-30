import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../backend/config/db";
import { verifyOtp } from "../../../../backend/modules/auth/verify-otp/controller";
import { handleError } from "../../../../backend/middleware/error";

export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const result = await verifyOtp(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};
