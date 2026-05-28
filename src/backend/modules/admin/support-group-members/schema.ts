import mongoose from "mongoose";

type GroupMemberDocument = {
  supportGroup: mongoose.Types.ObjectId; // Reference to SupportGroup
  user: mongoose.Types.ObjectId; // Reference to UserAccount
  joinedAt: Date;
  isActive: boolean;
};

const groupMemberSchema = new mongoose.Schema<GroupMemberDocument>(
  {
    supportGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SupportGroup",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccount",
      required: true,
    },
    joinedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

groupMemberSchema.index({ supportGroup: 1, user: 1 }, { unique: true });

const GroupMember =
  mongoose.models.GroupMember ||
  mongoose.model<GroupMemberDocument>("GroupMember", groupMemberSchema);

export default GroupMember;
