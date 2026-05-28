import { NextRequest } from "next/server";
import { authenticate } from "../../middleware/auth";
import { successResponse } from "../../utils/response";
import { getEndUserData } from "./service";

export async function getEndUser(req: NextRequest) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const data = await getEndUserData(auth.user._id, auth.user.email);
  return successResponse(data, "End user data fetched successfully", 200);
}
