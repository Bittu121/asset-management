import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../../backend/config/db";
import { addMember } from "../../../../../../backend/modules/admin/support-groups/controller";
import { handleError } from "../../../../../../backend/middleware/error";

type Params = {
  params: Promise<{ id: string }>;
};

export const POST = async (req: NextRequest, { params }: Params) => {
  await connectDB();
  try {
    const { id } = await params;
    const result = await addMember(req, id);
    return NextResponse.json(result, { status: result.statusCode });
  } catch (error) {
    const err = handleError(error);
    return NextResponse.json(err, { status: 500 });
  }
};
