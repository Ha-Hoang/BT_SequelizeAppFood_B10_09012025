import { responseSuccess } from "../common/helpers/response.helper.js";
import orderService from "../services/order.service.js";

const orderController = {
  createOrder: async (req, res, next) => {
    try {
      const orderResult = await orderService.createOrder(req);
      const resData = responseSuccess(
        orderResult,
        `${
          orderResult.action === "create" ? "Create" : "Update"
        } Order Successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default orderController;
