export type PaginationResult = {
  page: number;
  limit: number;
  skip: number;
  totalPages: number;
  totalItems: number;
};

export const paginate = (
  page: number,
  limit: number,
  totalItems: number,
): PaginationResult => {
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(totalItems / limit);
  return { page, limit, skip, totalPages, totalItems };
};
