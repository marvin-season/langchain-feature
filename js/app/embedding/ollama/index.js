import {OllamaEmbeddings} from "@langchain/ollama";

const defaultOptions = {
    model: 'mxbai-embed-large:latest'
}

export const createOllamaEmbedding = (options) => {
    return new OllamaEmbeddings(Object.assign({}, defaultOptions, options));
}