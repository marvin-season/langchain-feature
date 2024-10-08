import {LanceDB} from "@langchain/community/vectorstores/lancedb";
import {connect} from "vectordb";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import os from "node:os";
import {createOllamaEmbedding} from "../embedding/ollama/index.js";

export const run = async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "lancedb-"));
    const db = await connect(dir);
    const table = await db.createTable("vectors", [{vector: Array(1536), text: "sample", id: 1},]);

    const vectorStore = await LanceDB.fromTexts(["Hello world", "Bye bye", "hello nice world"], [{id: 2}, {id: 1}, {id: 3}], createOllamaEmbedding(), {table});


    const resultOne = await vectorStore.similaritySearch("hello world", 1);
    console.log(resultOne);
    // [ Document { pageContent: 'hello nice world', metadata: { id: 3 } } ]
};