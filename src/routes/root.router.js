import express from 'express'
import orderRouter from './order.router.js';
import resRouter from './restaurant.router.js';

const rootRouter = express.Router()

rootRouter.use(`/restaurant`, resRouter)
rootRouter.use(`/order`, orderRouter)

export default rootRouter