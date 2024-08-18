import express from "express";
import {chain, createStore, getDocuments, split} from "../service/demo.js";
import {run} from "../vector/LanceDB.js";

const DemoRouter = express.Router();

DemoRouter.get("/list", (_, res) => {
    res.json([1, 34]);
})

DemoRouter.get("/rag/:prompt", async (request, res) => {
    const {prompt} = request.params

    const docs = await getDocuments();
    const allSplits = await split(docs)
    const store = await createStore(allSplits);

    const retriever = store.asRetriever();
    const context = await retriever.invoke(prompt);
    const ragChain = await chain()

    const answer = await ragChain.invoke({
        context,
        question: prompt,
    });
    res.json({context, answer, prompt})
})

DemoRouter.get("/vector/:prompt", async (request, res) => {
    run()
    res.json({})
})

export default (ApiRouter) => {
    ApiRouter.use("/demo", DemoRouter);
}

