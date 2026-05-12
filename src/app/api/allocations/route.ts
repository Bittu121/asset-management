import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../backend/config/db";
import {
  getAllocations,
  createAllocation,
} from "../../../backend/modules/assets/allocation/controller";
import { handleError } from "../../../backend/middleware/error";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const result = await getAllocations(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const result = await createAllocation(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}
