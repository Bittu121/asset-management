import { NextResponse } from "next/server";

export const validateFields = (
  body: Record<string, any>,
  requiredFields: string[],
) => {
  const missing = requiredFields.filter((field) => !body[field]?.trim());

  if (missing.length > 0) {
    return NextResponse.json(
      { message: `Missing fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }
  return null;
};
