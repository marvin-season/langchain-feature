import dotenv from 'dotenv'

dotenv.config({
    path: `.env`
});

dotenv.config({
    path: `.env.${process.env.ENV}`,
})
import express from 'express';
import DemoController from "./app/controller/DemoController.js";

const ApiRouter = express.Router();

const app = express();
app.use("/api", ApiRouter);

DemoController(ApiRouter);


app.listen(process.env.PORT || 5000, () => {
    console.log(`listening on port ${process.env.PORT || 5000}`);
})
