"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Cpu, DollarSign, Package, Tag, Calendar, Monitor, Wifi } from "lucide-react";

type Asset = {
  _id: string;
  assetTag: string;
  serialNumber: string;
  category: { _id: string; name: string } | null;
  subCategory: { _id: string; name: string } | null;
  assetType: { _id: string; name: string } | null;
  manufacturer: string;
  model: string;
  device: string;
  isActive: boolean;
  description: string;
  vendor: { _id: string; vendorName: string; phone: string } | null;
  purchaseOrderId: string;
  purchaseDate: string;
  purchaseCost: string;
  currentValue: string;
  warrantyExpiry: string;
  amcExpiry: string;
  os: string;
  osVersion: string;
  processor: string;
  ram: string;
  storageSize: string;
  hostname: string;
  ipAddress: string;
  macAddress: string;
  createdAt: string;
};

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-400 w-36 shrink-0">{label}</span>
      <span className="text-xs text-gray-800 font-medium text-right break-all">{value}</span>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <span className="text-indigo-500">{icon}</span>
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="px-4 py-1">{children}</div>
    </div>
  );
}

export default function AssetDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetch_ = async () => {
      try {
        const res = await fetch(`/api/assets/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Asset not found");
        } else {
          setAsset(data.data);
        }
      } catch {
        setError("Failed to load asset details");
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-500">Loading asset details…</p>
        </div>
      </div>
    );
  }

  if (error || !asset) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-sm w-full">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <Package size={24} className="text-red-400" />
          </div>
          <h2 className="text-base font-semibold text-gray-800">Asset Not Found</h2>
          <p className="text-sm text-gray-400 mt-1">
            {error || "This asset does not exist or has been removed."}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-5 px-5 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const fmt = (v?: string) => (v ? `₹${Number(v).toLocaleString("en-IN")}` : "—");

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-10">
      {/* ── TOP BAR ─────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-sm font-bold text-gray-900">{asset.assetTag}</h1>
            <p className="text-xs text-gray-400">{asset.device || asset.model}</p>
          </div>
          <span
            className={`ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              asset.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                asset.isActive ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            {asset.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-5 space-y-4">
        {/* ── HERO CARD ───────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-1.5 bg-indigo-600" />
          <div className="px-5 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-2xl font-extrabold text-gray-900 tracking-wide">
                  {asset.assetTag}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{asset.device || asset.model || "—"}</p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                <Monitor size={22} className="text-indigo-500" />
              </div>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-2 mt-4">
              {asset.category && (
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                  {asset.category.name}
                </span>
              )}
              {asset.subCategory && (
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                  {asset.subCategory.name}
                </span>
              )}
              {asset.assetType && (
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  {asset.assetType.name}
                </span>
              )}
              {asset.manufacturer && (
                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                  {asset.manufacturer}
                </span>
              )}
            </div>

            {asset.description && (
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">{asset.description}</p>
            )}
          </div>
        </div>

        {/* ── IDENTIFICATION ───────────────────────────────── */}
        <Section icon={<Tag size={15} />} title="Identification">
          <InfoRow label="Asset Tag" value={asset.assetTag} />
          <InfoRow label="Serial Number" value={asset.serialNumber} />
          <InfoRow label="Model" value={asset.model} />
          <InfoRow label="Manufacturer" value={asset.manufacturer} />
          <InfoRow label="Category" value={asset.category?.name} />
          <InfoRow label="Sub Category" value={asset.subCategory?.name} />
        </Section>

        {/* ── FINANCIAL ───────────────────────────────────── */}
        <Section icon={<DollarSign size={15} />} title="Financial">
          <InfoRow label="Vendor" value={asset.vendor?.vendorName} />
          <InfoRow label="Vendor Phone" value={asset.vendor?.phone} />
          <InfoRow label="Purchase Order" value={asset.purchaseOrderId} />
          <InfoRow label="Purchase Date" value={asset.purchaseDate} />
          <InfoRow label="Purchase Cost" value={fmt(asset.purchaseCost)} />
          <InfoRow label="Current Value" value={fmt(asset.currentValue)} />
          <InfoRow label="Warranty Expiry" value={asset.warrantyExpiry} />
          <InfoRow label="AMC Expiry" value={asset.amcExpiry} />
        </Section>

        {/* ── SPECIFICATIONS ───────────────────────────────── */}
        <Section icon={<Cpu size={15} />} title="Specifications">
          <InfoRow label="Operating System" value={asset.os} />
          <InfoRow label="OS Version" value={asset.osVersion} />
          <InfoRow label="Processor" value={asset.processor} />
          <InfoRow label="RAM" value={asset.ram} />
          <InfoRow label="Storage" value={asset.storageSize} />
        </Section>

        {/* ── NETWORK ─────────────────────────────────────── */}
        <Section icon={<Wifi size={15} />} title="Network">
          <InfoRow label="Hostname" value={asset.hostname} />
          <InfoRow label="IP Address" value={asset.ipAddress} />
          <InfoRow label="MAC Address" value={asset.macAddress} />
        </Section>

        {/* ── RECORD ──────────────────────────────────────── */}
        <Section icon={<Calendar size={15} />} title="Record">
          <InfoRow label="Asset ID" value={asset._id} />
          <InfoRow
            label="Created At"
            value={new Date(asset.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          />
        </Section>
      </div>
    </div>
  );
}
