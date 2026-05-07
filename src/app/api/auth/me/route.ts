import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../backend/config/db";
import { authenticate } from "../../../../backend/middleware/auth";

export const GET = async (req: NextRequest) => {
  await connectDB();

  const auth = await authenticate(req);

  if ("statusCode" in auth) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.statusCode },
    );
  }

  return NextResponse.json(
    {
      user: auth.user,
    },
    { status: 200 },
  );
};
