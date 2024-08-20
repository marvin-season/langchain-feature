import {ChatOllama} from '@langchain/ollama';

export class OllamaProvider {
  constructor(model) {
    this.model = model;
    this.baseUrl = process.env.OLLAMA_BASE_URL;
    this.keepAlive = false;

  }

  #createClient({
                  temperature
                }) {
    return new ChatOllama({
      baseUrl: this.baseUrl,
      model: this.model,
      keepAlive: this.keepAlive,
      useMLock: true,
      temperature,
    });
  }
}
