import express from "express";
import rootRouter from "./src/routes/root.router.js";
import cors from 'cors'

const app = express();

// middleware giúp phân giải dữ liệu từ json sang đối tượng javascript
app.use(express.json());
app.use(cors({
   origin: ['http://localhost:5173']
}))

app.use(rootRouter);

app.listen(3069, () => {
   console.log(`Server Online At Port 3069`);
});