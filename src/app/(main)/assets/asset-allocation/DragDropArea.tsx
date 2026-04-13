"use client";

type Asset = {
  id: number;
  assetTag: string;
  assetName: string;
  status: "AVAILABLE" | "ALLOCATED";
};

type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  assets: Asset[];
  users: User[];
  allocations: any[];
  draggingAssetId: number | null;
  setDraggingAssetId: (id: number | null) => void;
  onAssign: (assetId: number, userId: number) => void;
};

export default function DragDropArea({
  assets,
  users,
  allocations,
  draggingAssetId,
  setDraggingAssetId,
  onAssign,
}: Props) {
  const availableAssets = assets.filter((a) => a.status === "AVAILABLE");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h2 className="text-sm font-semibold mb-3">
          Drag Asset (from left) to User (right)
        </h2>
        <div className="space-y-2">
          {availableAssets.length === 0 ? (
            <p className="text-xs text-gray-500">
              No available assets to allocate.
            </p>
          ) : (
            availableAssets.map((asset) => (
              <div
                key={asset.id}
                draggable
                onDragStart={() => setDraggingAssetId(asset.id)}
                className="cursor-grab p-3 rounded-lg border border-gray-200 bg-slate-50 hover:border-blue-300"
              >
                <strong>{asset.assetTag}</strong> - {asset.assetName}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h2 className="text-sm font-semibold mb-3">Drop onto User to assign</h2>
        <div className="space-y-2">
          {users.map((user) => {
            const countAssigned = allocations.filter(
              (a) => a.allocatedToId === user.id && a.status !== "RETURNED",
            ).length;
            return (
              <div
                key={user.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggingAssetId !== null) {
                    onAssign(draggingAssetId, user.id);
                    setDraggingAssetId(null);
                  }
                }}
                className="p-3 rounded-lg border border-gray-200 bg-slate-50 hover:border-blue-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <span className="text-xs text-gray-600">
                    {countAssigned} assigned
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
