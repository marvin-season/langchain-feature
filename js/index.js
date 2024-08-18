import dotenv from 'dotenv'

dotenv.config({
    path: `.env`
});

dotenv.config({
    path: `.env.${process.env.ENV}`,
})

import express from 'express';
import DemoController from "./app/endpoints/demo.js";

const apiRouter = express.Router();
const app = express();
app.use("/api", apiRouter);


DemoController(apiRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`listening on port ${process.env.PORT || 5000}`);
})