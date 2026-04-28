import { errorResponse } from "../utils/response";
import { messages } from "../constants/messages";

export const handleError = (error: unknown) => {
  console.error(error);
  return errorResponse(messages.SERVER.ERROR, 500);
};
