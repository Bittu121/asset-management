import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../backend/config/db";
import login from "../../../../backend/modules/auth/login/controller.ts";
import { handleError } from "../../../../backend/middleware/error";

export const POST = async (req) => {
  await connectDB();
  try {
    const result = await login(req);
    return result;
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};
