import dotenv from 'dotenv'

dotenv.config({
    path: `.env`
})
import express from 'express';
import DemoController from "./app/endpoints/demo.js";

const apiRouter = express.Router();
const app = express();
app.use("/api", apiRouter);


DemoController(apiRouter);

app.listen(5001, () => {
    console.log('listening on port 5001');
})