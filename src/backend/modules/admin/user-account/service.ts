import UserAccount from "./schema";
import { CreateUserAccountDto, UpdateUserAccountDto } from "./dto";
import { hashPassword } from "../../../utils/bcrypt";

// Get all user accounts
export const getAllUserAccounts = async () => {
  const users = await UserAccount.find()
    .select("-password")
    .sort({ createdAt: -1 });
  return users;
};

// Get single user account
export const getUserAccountById = async (id: string) => {
  const user = await UserAccount.findById(id).select("-password");
  return user;
};

// Check duplicate email
export const getUserByEmail = async (email: string) => {
  const user = await UserAccount.findOne({ email });
  return user;
};

// Check duplicate employee code
export const getUserByEmployeeCode = async (employeeCode: string) => {
  const user = await UserAccount.findOne({ employeeCode });
  return user;
};

// Create user account
export const createUserAccount = async (data: CreateUserAccountDto) => {
  const hashedPassword = await hashPassword(data.password);
  const user = await UserAccount.create({
    ...data,
    password: hashedPassword,
  });

  // Return without password
  const userObj = user.toObject() as any;
  delete userObj.password;
  return userObj;
};

// Update user account
export const updateUserAccount = async (
  id: string,
  data: UpdateUserAccountDto,
) => {
  // Hash password if it's being updated
  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  const user = await UserAccount.findByIdAndUpdate(id, data, {
    new: true,
  }).select("-password");

  return user;
};

// Delete user account
export const deleteUserAccount = async (id: string) => {
  const user = await UserAccount.findByIdAndDelete(id);
  return user;
};
