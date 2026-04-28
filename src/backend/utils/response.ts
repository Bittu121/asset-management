const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
};

export const successResponse = (
  data: unknown,
  message: string,
  statusCode = 200,
) => {
  return {
    status: STATUS.SUCCESS,
    message,
    data,
    statusCode,
  };
};

export const errorResponse = (message: string, statusCode = 500) => {
  return {
    status: STATUS.ERROR,
    message,
    statusCode,
  };
};
