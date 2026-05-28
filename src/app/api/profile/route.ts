import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../backend/config/db";
import { getProfile } from "../../../backend/modules/profile/controller";
import { handleError } from "../../../backend/middleware/error";

export const GET = async (req: NextRequest) => {
  await connectDB();
  try {
    const result = await getProfile(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
};
