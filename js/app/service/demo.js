import {CheerioWebBaseLoader} from "@langchain/community/document_loaders/web/cheerio";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import {MemoryVectorStore} from "langchain/vectorstores/memory";
import {ChatOllama, OllamaEmbeddings} from "@langchain/ollama";
import {pull} from "langchain/hub";
import {StringOutputParser} from "@langchain/core/output_parsers";
import {createStuffDocumentsChain} from "langchain/chains/combine_documents";
import {TextLoader} from "langchain/document_loaders/fs/text";
import {createOllamaEmbedding} from "../embedding/ollama/index.js";

const llm = new ChatOllama({
    model: "llama3.1:latest",
    temperature: 0
});
const getDocuments = async () => {
    const pTagSelector = "p";
    // const loader = new CheerioWebBaseLoader("https://juejin.cn/post/7378779608353669158?searchId=2024081815245427E7CE3545CB9BA5404E", {
    //     selector: pTagSelector,
    // });
    //
    const loader = new TextLoader("D:\\doc\\测试知识库.txt",)
    return await loader.load()
}

const split = async (docs) => {
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100, chunkOverlap: 10,
    });
    return await textSplitter.splitDocuments(docs);
}


const createStore = async (allSplits) => {
    return await MemoryVectorStore.fromDocuments(
        allSplits,
        createOllamaEmbedding()
        // new AzureOpenAIEmbeddings({
        //     azureOpenAIApiKey: process.env.AZURE_OPENAI_KEY,
        //     azureOpenAIBasePath: process.env.AZURE_OPENAI_ENDPOINT,
        //     azureADTokenProvider: process.env.LLM_PROVIDER,
        //     model: process.env.EMBEDDING_MODEL_PREF,
        //     azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_ENDPOINT,
        //     azureOpenAIApiVersion: process.env.OPEN_AI_API_VERSION,
        // })
    )
}

const chain = async () => {
    const prompt = await pull("rlm/rag-prompt");


    return await createStuffDocumentsChain({
        llm,
        prompt,
        outputParser: new StringOutputParser(),
    });
}

export {getDocuments, split, createStore, chain}

