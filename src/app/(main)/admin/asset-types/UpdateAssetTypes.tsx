"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

function UpdateAssetTypes({
  isOpen,
  onClose,
  selectedAssetTypes,
  onUpdate,
  categories,
  subCategories,
}: any) {
  const [form, setForm] = useState<any>({
    name: "",
    category: "",
    subCategory: "",
    description: "",
    isActive: true,
  });
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);

  useEffect(() => {
    if (selectedAssetTypes) {
      setForm(selectedAssetTypes);
    }
  }, [selectedAssetTypes]);

  const filteredSub = subCategories.filter(
    (s: any) => s.parent === form.category,
  );

  if (!isOpen) return null;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category: string) => {
    setForm((prev: any) => ({ ...prev, category, subCategory: "" }));
    setOpenCategory(false);
    setOpenSubCategory(false);
  };

  const handleSubCategorySelect = (subCategory: string) => {
    setForm((prev: any) => ({ ...prev, subCategory }));
    setOpenSubCategory(false);
  };

  const handleUpdate = () => {
    onUpdate(form);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Update Asset Types
            </h2>

            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          <div className="h-px bg-gray-100 mb-5"></div>
          <div className="space-y-3">
            <input
              name="name"
              placeholder="Asset type"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <div className="relative">
              <div
                onClick={() => setOpenCategory((prev) => !prev)}
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
              >
                {form.category || "Select category"}
              </div>
              {openCategory && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
                  {categories.map((cat: any) => (
                    <div
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.name)}
                      className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => {
                  if (!form.category) return;
                  setOpenSubCategory((prev) => !prev);
                }}
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm cursor-pointer bg-white"
              >
                {form.subCategory || "Select subcategory"}
              </div>
              {openSubCategory && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto custom-scroll z-50">
                  {filteredSub.length > 0 ? (
                    filteredSub.map((sub: any) => (
                      <div
                        key={sub.id}
                        onClick={() => handleSubCategorySelect(sub.name)}
                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        {sub.name}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500">Select a category first</div>
                  )}
                </div>
              )}
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <div className="flex justify-between items-center w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400">
              <span className="text-sm text-gray-600">Active</span>

              <button
                onClick={() =>
                  setForm((prev: any) => ({
                    ...prev,
                    isActive: !prev.isActive,
                  }))
                }
                className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                  form.isActive ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                    form.isActive ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateAssetTypes;
