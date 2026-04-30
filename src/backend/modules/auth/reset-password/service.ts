import UserAccount from "../../admin/user-account/schema";
import { hashPassword } from "../../../utils/bcrypt";

export const resetPasswordService = async (email: string, password: string) => {
  const user = await UserAccount.findOne({ email });
  if (!user) return null;

  const hashedPassword = await hashPassword(password);

  await UserAccount.findByIdAndUpdate(user._id, {
    password: hashedPassword,
  });

  return { email };
};
