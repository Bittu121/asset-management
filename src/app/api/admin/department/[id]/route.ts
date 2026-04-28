import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../backend/config/db";
import {
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../../../../backend/modules/admin/department/controller";
import { handleError } from "../../../../../backend/middleware/error";

type Params = {
  params: Promise<{ id: string }>;
};

export const GET = async (req: NextRequest, { params }: Params) => {
  await connectDB();
  try {
    const { id } = await params;
    const result = await getSingleDepartment(req, id);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};

export const PUT = async (req: NextRequest, { params }: Params) => {
  await connectDB();
  try {
    const { id } = await params;
    const result = await updateDepartment(req, id);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  await connectDB();
  try {
    const { id } = await params;
    const result = await deleteDepartment(req, id);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};
