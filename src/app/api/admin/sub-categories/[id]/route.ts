import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../backend/config/db";
import {
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../../../../../backend/modules/admin/sub-categories/controller";
import { handleError } from "../../../../../backend/middleware/error";

type Params = { params: Promise<{ id: string }> };

export const GET = async (req: NextRequest, { params }: Params) => {
  await connectDB();
  try {
    const { id } = await params;
    const result = await getSingleSubCategory(req, id);
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
    const result = await updateSubCategory(req, id);
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
    const result = await deleteSubCategory(req, id);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};
