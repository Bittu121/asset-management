import mongoose from "mongoose";
import SupportGroup from "./schema";
import { CreateSupportGroupDto, UpdateSupportGroupDto } from "./dto";

export const getAllSupportGroups = async () => {
  return await SupportGroup.find()
    .populate("manager", "name email employeeCode")
    .sort({ createdAt: -1 });
};

export const getSupportGroupById = async (id: string) => {
  return await SupportGroup.findById(id).populate(
    "manager",
    "name email employeeCode designation",
  );
};

export const getSupportGroupByCode = async (code: string) => {
  return await SupportGroup.findOne({ code: code.toUpperCase() });
};

export const createSupportGroup = async (data: CreateSupportGroupDto) => {
  const supportGroup = await SupportGroup.create({
    ...data,
    code: data.code.toUpperCase(),
  });

  return await getSupportGroupById(supportGroup._id.toString());
};

export const updateSupportGroup = async (
  id: string,
  data: UpdateSupportGroupDto,
) => {
  if (data.code) {
    data.code = data.code.toUpperCase();
  }

  return await SupportGroup.findByIdAndUpdate(id, data, { new: true }).populate(
    "manager",
    "name email employeeCode",
  );
};

export const deleteSupportGroup = async (id: string) => {
  return await SupportGroup.findByIdAndDelete(id);
};

export const addMemberToGroup = async (groupId: string, userId: string) => {
  return await SupportGroup.findByIdAndUpdate(
    groupId,
    { $addToSet: { members: new mongoose.Types.ObjectId(userId) } },
    { new: true },
  );
};

export const removeMemberFromGroup = async (
  groupId: string,
  userId: string,
) => {
  return await SupportGroup.findByIdAndUpdate(
    groupId,
    { $pull: { members: new mongoose.Types.ObjectId(userId) } },
    { new: true },
  );
};
