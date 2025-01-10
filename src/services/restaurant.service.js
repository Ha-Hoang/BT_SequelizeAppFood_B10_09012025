import { BadRequestException } from "../common/helpers/error.helper.js";
import models, { sequelize } from "../common/sequelize/init.sequelize.js";

const restaurantService = {
  likeRestaurant: async (req) => {
    const { resId, userId } = req.body;

    if (!(resId && userId)) {
      throw new BadRequestException(`Missing resId, userId!`);
    }

    const restaurant = await models.restaurants.findByPk(resId);
    if (!restaurant) {
      throw new BadRequestException(
        `Restaurant with id ${resId} does not exist`
      );
    }

    const user = await models.users.findByPk(userId);
    if (!user) {
      throw new BadRequestException(`User with id ${userId} does not exist`);
    }

    let likeRestaurantResult = await models.like_res.findOne({
      where: {
        res_id: resId,
        user_id: userId,
      },
    });

    if (!likeRestaurantResult) {
      // like
      likeRestaurantResult = await models.like_res.create({
        res_id: resId,
        user_id: userId,
      });
      return {
        ...likeRestaurantResult.toJSON(),
        action: 'like'
      };
    } else {
      // unlike
      await models.like_res.destroy({
        where: {
          res_id: resId,
          user_id: userId,
        },
      });
      return {
        res_id: resId,
        user_id: userId,
        action: 'unlike'
      };
    }
  },
  getLikeRestaurant: async (req) => {
    const { userId, resId } = req.query;

    let whereClause = {};
    if (userId) whereClause.user_id = userId;
    if (resId) whereClause.res_id = resId;

    const likeRestaurantResult = await models.like_res.findAll({
      where: whereClause,
      include: [
        {
          model: models.restaurants,
          as: 're',
          attributes: []
        },
        {
          model: models.users,
          as: 'user',
          attributes: []
        },
      ],
      attributes: [
        'user_id',
        'res_id',
        [sequelize.col('re.res_name'), 'resName'],
        [sequelize.col('user.full_name'), 'userName'],
      ]
    });
    return likeRestaurantResult;
  }
};

export default restaurantService;
