import { responseSuccess } from "../common/helpers/response.helper.js";
import restaurantService from "../services/restaurant.service.js";

const restaurantController = {
  likeRestaurant: async (req, res, next) => {
    try {
      const likeResult = await restaurantService.likeRestaurant(req);
      const resData = responseSuccess(
        likeResult,
        `${likeResult.action === 'like' ? 'Like' : 'Unlike'} Restaurant Successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getLikeRestaurant: async (req, res, next) => {
    try {
      const likeResult = await restaurantService.getLikeRestaurant(req);
      const resData = responseSuccess(likeResult,`Get Liked Restaurant Successfully`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default restaurantController;