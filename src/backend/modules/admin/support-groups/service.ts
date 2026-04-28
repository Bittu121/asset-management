import SupportGroup from "./schema";
import { CreateSupportGroupDto, UpdateSupportGroupDto } from "./dto";

// Get all support groups
export const getAllSupportGroups = async () => {
  const supportGroups = await SupportGroup.find().sort({ createdAt: -1 });
  return supportGroups;
};

// Get single support group
export const getSupportGroupById = async (id: string) => {
  const supportGroup = await SupportGroup.findById(id);
  return supportGroup;
};

// Check duplicate code
export const getSupportGroupByCode = async (code: string) => {
  const supportGroup = await SupportGroup.findOne({ code });
  return supportGroup;
};

// Create support group
export const createSupportGroup = async (data: CreateSupportGroupDto) => {
  const supportGroup = await SupportGroup.create(data);
  return supportGroup;
};

// Update support group
export const updateSupportGroup = async (
  id: string,
  data: UpdateSupportGroupDto,
) => {
  const supportGroup = await SupportGroup.findByIdAndUpdate(id, data, {
    new: true,
  });
  return supportGroup;
};

// Delete support group
export const deleteSupportGroup = async (id: string) => {
  const supportGroup = await SupportGroup.findByIdAndDelete(id);
  return supportGroup;
};
