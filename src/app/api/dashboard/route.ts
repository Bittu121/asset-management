import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../backend/config/db";
import { getDashboard } from "../../../backend/modules/dashboard/controller";
import { handleError } from "../../../backend/middleware/error";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const result = await getDashboard(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}
