import { Sequelize } from "sequelize";
import initModels from "../../models/init-models.js";
import { DATABASE_URL } from "../constants/app.constant.js";

export const sequelize = new Sequelize(DATABASE_URL, { logging: false });
const models = initModels(sequelize);

sequelize
   .authenticate()
   .then(() => {
      console.log(`Connect db successfully`);
   })
   .catch(() => {
      console.log(`Failed to connect db`);
   });

export default models;
