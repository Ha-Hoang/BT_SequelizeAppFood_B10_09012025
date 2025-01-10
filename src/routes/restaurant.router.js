import express from "express";
import restaurantController from "../controllers/restaurant.controller.js";

const restaurantRouter = express.Router();

restaurantRouter.post(`/like` , restaurantController.likeRestaurant);
restaurantRouter.get(`/get-liked-restaurants` , restaurantController.getLikeRestaurant);

export default restaurantRouter;