import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../backend/config/db";
import {
  returnAsset,
  removeAllocation,
} from "../../../../backend/modules/assets/allocation/controller";
import { handleError } from "../../../../backend/middleware/error";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  await connectDB();
  try {
    const { id } = await params;
    const result = await returnAsset(req, id);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  await connectDB();
  try {
    const { id } = await params;
    const result = await removeAllocation(req, id);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}
