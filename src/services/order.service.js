import { BadRequestException } from "../common/helpers/error.helper.js";
import models, { sequelize } from "../common/sequelize/init.sequelize.js";

const orderService = {
  createOrder: async (req) => {
    const { foodId, userId, amount } = req.body;

    if (!(foodId && userId)) {
      throw new BadRequestException(`Missing food_id, userId!`);
    }

    const food = await models.foods.findByPk(foodId);
    if (!food) {
      throw new BadRequestException(`Food with id ${foodId} does not exist`);
    }

    const user = await models.users.findByPk(userId);
    if (!user) {
      throw new BadRequestException(`User with id ${userId} does not exist`);
    }

    let orderResult = await models.orders.findOne({
      where: {
        food_id: foodId,
        user_id: userId,
      },
    });

    if (!orderResult) {
      // create order
      orderResult = await models.orders.create({
        food_id: foodId,
        user_id: userId,
        amount,
      });
      return {
        ...orderResult.toJSON(),
        action: "create",
      };
    } else {
      // update order
      orderResult = await models.orders.update(
        { amount, },
        {
          where: {
            food_id: foodId,
            user_id: userId,
          },
        }
      );
      return {
        action: "update",
      };
    }
  },
};

export default orderService;
