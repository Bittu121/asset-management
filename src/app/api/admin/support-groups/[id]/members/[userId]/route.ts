import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../../../backend/config/db";
import { removeMember } from "../../../../../../../backend/modules/admin/support-groups/controller";
import { handleError } from "../../../../../../../backend/middleware/error";

type Params = {
  params: Promise<{ id: string; userId: string }>;
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  await connectDB();
  try {
    const { id, userId } = await params;
    const result = await removeMember(req, id, userId);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};
