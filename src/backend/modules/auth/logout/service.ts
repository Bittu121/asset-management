import UserAccount from "../../admin/user-account/schema";

export const logoutService = async (userId?: string) => {
  // clear refreshToken from DB
  if (userId) {
    await UserAccount.findByIdAndUpdate(userId, {
      refreshToken: "",
    });
  }

  return true;
};
