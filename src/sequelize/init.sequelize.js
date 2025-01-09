import { Sequelize } from "sequelize";
import initModels from "../../models/init-models.js";
import { DATABASE_URL } from "../constant/app.constant.js";

export const sequelize = new Sequelize(DATABASE_URL, { logging: false });
const models = initModels(sequelize);

sequelize
   .authenticate()
   .then(() => {
      console.log(`Kết nối với db thành công`);
   })
   .catch(() => {
      console.log(`Kết nối với db KHÔNG thành công`);
   });

export default models;