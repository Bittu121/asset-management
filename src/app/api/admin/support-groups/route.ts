import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../backend/config/db";
import {
  getSupportGroups,
  createSupportGroup,
} from "../../../../backend/modules/admin/support-groups/controller";
import { handleError } from "../../../../backend/middleware/error";

export const GET = async (req: NextRequest) => {
  await connectDB();
  try {
    const result = await getSupportGroups(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const result = await createSupportGroup(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};
