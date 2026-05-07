"use client";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, UserMinus, UserPlus, Users } from "lucide-react";
import { AppDispatch, RootState } from "@/store/auth/store";
import {
  addMemberAction,
  removeMemberAction,
} from "@/store/supportGroups/supportGroupsActions";

function SupportGroupMembersModal({
  isOpen,
  onClose,
  supportGroup,
}: {
  isOpen: boolean;
  onClose: () => void;
  supportGroup: any;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { supportGroups, addMemberLoading, removeMemberLoading } = useSelector(
    (state: RootState) => state.supportGroups,
  );
  const { users } = useSelector((state: RootState) => state.userAccounts);

  const [memberSearch, setMemberSearch] = useState("");
  const [availableSearch, setAvailableSearch] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);

  // Always read the live group from Redux so member list updates instantly
  const liveGroup = supportGroups.find((g) => g._id === supportGroup?._id);
  const memberIds: string[] = liveGroup?.members || [];

  const members = useMemo(
    () => users.filter((u) => memberIds.includes(u._id)),
    [users, memberIds],
  );

  const available = useMemo(
    () => users.filter((u) => !memberIds.includes(u._id)),
    [users, memberIds],
  );

  const filteredMembers = memberSearch
    ? members.filter(
        (u) =>
          u.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
          u.employeeCode.toLowerCase().includes(memberSearch.toLowerCase()) ||
          u.email.toLowerCase().includes(memberSearch.toLowerCase()),
      )
    : members;

  const filteredAvailable = availableSearch
    ? available.filter(
        (u) =>
          u.name.toLowerCase().includes(availableSearch.toLowerCase()) ||
          u.employeeCode
            .toLowerCase()
            .includes(availableSearch.toLowerCase()) ||
          u.email.toLowerCase().includes(availableSearch.toLowerCase()),
      )
    : available;

  if (!isOpen || !supportGroup) return null;

  const handleAdd = (userId: string) => {
    setAddingId(userId);
    dispatch(
      addMemberAction(supportGroup._id, userId, () => setAddingId(null)),
    );
  };

  const handleRemove = (userId: string) => {
    setRemovingId(userId);
    dispatch(
      removeMemberAction(supportGroup._id, userId, () => setRemovingId(null)),
    );
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">
                Manage Members
              </h2>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              <span className="font-medium text-gray-700">
                {supportGroup.name}
              </span>{" "}
              &mdash; {memberIds.length} member
              {memberIds.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body — two columns */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">
          {/* LEFT: current members */}
          <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-gray-200 min-h-0">
            <div className="px-5 pt-4 pb-3 flex-shrink-0">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Current Members ({members.length})
              </h3>
              <input
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                placeholder="Search members..."
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-2">
              {filteredMembers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <Users size={16} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    {memberSearch ? "No members match" : "No members yet"}
                  </p>
                </div>
              ) : (
                filteredMembers.map((user) => {
                  const isRemoving =
                    removingId === user._id && removeMemberLoading;
                  return (
                    <div
                      key={user._id}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.employeeCode} &middot;{" "}
                            {user.designation || user.role?.name}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(user._id)}
                        disabled={isRemoving}
                        title="Remove member"
                        className="flex-shrink-0 p-1.5 rounded-md text-red-500 hover:bg-red-50 hover:text-red-700 transition disabled:opacity-50"
                      >
                        {isRemoving ? (
                          <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <UserMinus size={16} />
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT: available users to add */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-5 pt-4 pb-3 flex-shrink-0">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Add Members ({available.length} available)
              </h3>
              <input
                value={availableSearch}
                onChange={(e) => setAvailableSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-2">
              {filteredAvailable.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <Users size={16} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    {availableSearch
                      ? "No users match"
                      : "All users are already members"}
                  </p>
                </div>
              ) : (
                filteredAvailable.map((user) => {
                  const isAdding = addingId === user._id && addMemberLoading;
                  return (
                    <div
                      key={user._id}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.employeeCode} &middot;{" "}
                            {user.designation || user.role?.name}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAdd(user._id)}
                        disabled={isAdding}
                        title="Add member"
                        className="flex-shrink-0 p-1.5 rounded-md text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800 transition disabled:opacity-50"
                      >
                        {isAdding ? (
                          <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <UserPlus size={16} />
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupportGroupMembersModal;
