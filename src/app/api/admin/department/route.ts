import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../backend/config/db";
import {
  getDepartments,
  createDepartment,
} from "../../../../backend/modules/admin/department/controller";
import { handleError } from "../../../../backend/middleware/error";

export const GET = async (req: NextRequest) => {
  await connectDB();
  try {
    const result = await getDepartments(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const result = await createDepartment(req);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};
