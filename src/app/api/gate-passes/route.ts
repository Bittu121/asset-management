import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../backend/config/db";
import {
  getGatePasses,
  createGatePass,
} from "../../../backend/modules/assets/asset-gate-pass/controller";
import { handleError } from "../../../backend/middleware/error";

// GET /api/gate-passes 
export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const result = await getGatePasses(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}

// POST /api/gate-passes 
export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const result = await createGatePass(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}
