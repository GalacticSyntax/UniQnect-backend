import httpStatus from "http-status";
import catchAsync from "../../utils/catch.async";
import { sendResponse } from "../../utils/send.response";
import { DummyService } from "./dummy.service";

const createDummy = catchAsync(async (req, res) => {
  const result = await DummyService.createDummy(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "post details found succesfully",
    data: result,
  });
});

export const DummyController = {
  createDummy,
};
