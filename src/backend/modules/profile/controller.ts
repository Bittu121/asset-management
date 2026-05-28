import { NextRequest } from "next/server";
import { authenticate } from "../../middleware/auth";
import { successResponse, errorResponse } from "../../utils/response";
import { getProfileData } from "./service";

export async function getProfile(req: NextRequest) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const data = await getProfileData(auth.user._id);
  if (!data) return errorResponse("Profile not found", 404);

  return successResponse(data, "Profile fetched successfully", 200);
}
