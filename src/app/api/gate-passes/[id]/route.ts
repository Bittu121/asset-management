import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../backend/config/db";
import {
  getSingleGatePass,
  updateGatePassStatus,
  deleteGatePass,
} from "../../../../backend/modules/assets/asset-gate-pass/controller";
import { handleError } from "../../../../backend/middleware/error";

type Params = { params: Promise<{ id: string }> };

// GET /api/gate-passes/:id
export async function GET(req: NextRequest, { params }: Params) {
  await connectDB();
  try {
    const { id } = await params;
    const result = await getSingleGatePass(req, id);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}

// PUT /api/gate-passes/:id — update gate pass status (approve/reject/issue/return)
export async function PUT(req: NextRequest, { params }: Params) {
  await connectDB();
  try {
    const { id } = await params;
    const result = await updateGatePassStatus(req, id);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}

// DELETE /api/gate-passes/:id
export async function DELETE(req: NextRequest, { params }: Params) {
  await connectDB();
  try {
    const { id } = await params;
    const result = await deleteGatePass(req, id);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}
