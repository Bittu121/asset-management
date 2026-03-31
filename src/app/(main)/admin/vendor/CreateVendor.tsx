"use client";
import React from "react";

function CreateVendor({ isOpen, onClose, onAdd }: any) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
    contractExpiry: "",
    isActive: true,
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone) return;

    onAdd(form);

    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      gstNumber: "",
      contractExpiry: "",
      isActive: true,
    });

    onClose();
  };
  return (
    <>
      <div></div>
    </>
  );
}

export default CreateVendor;
