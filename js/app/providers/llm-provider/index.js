import {OllamaProvider} from './ollama/index.js';

export class LLMProviderManager {
  static getLLMProvider({
                   provider = undefined, model = undefined
                 }) {
    const {LLM_PROVIDER} = process.env;

    switch (LLM_PROVIDER) {
      default:
        return new OllamaProvider()
    }
  }
}
