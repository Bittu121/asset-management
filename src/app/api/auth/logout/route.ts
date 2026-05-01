import { NextRequest } from "next/server";
import { logout } from "../../../../backend/modules/auth/logout/controller";

export const POST = async (req: NextRequest) => {
  return logout(req);
};
