import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../backend/config/db";
import {
  getAssetTypes,
  createAssetType,
} from "../../../../backend/modules/admin/asset-types/controller";
import { handleError } from "../../../../backend/middleware/error";

export const GET = async (req: NextRequest) => {
  await connectDB();
  try {
    const result = await getAssetTypes(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const result = await createAssetType(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};
