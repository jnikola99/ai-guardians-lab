// LLM Service for AI Guardians Lab
// Handles communication with different LLM models using official Hugging Face JS library
import { InferenceClient } from '@huggingface/inference';

export interface LLMResponse {
  text: string;
  model: string;
  timestamp: number;
  error?: string;
}

export interface LLMModel {
  id: string;
  name: string;
  description: string;
  security: string;
  modelId: string; // Hugging Face model identifier
  isReal: boolean;
}

export const AVAILABLE_MODELS: LLMModel[] = [
  {
    id: 'qwen2.5-7b',
    name: 'Qwen2.5-7B-Instruct',
    description: 'Modern capable model (2024) - Potentially vulnerable to sophisticated attacks',
    security: 'Srednja',
    modelId: 'Qwen/Qwen2.5-7B-Instruct',
    isReal: true
  },
  {
    id: 'gpt2',
    name: 'GPT-2',
    description: 'Classic older model (2019) - Very vulnerable to attacks',
    security: 'Vrlo slaba',
    modelId: 'gpt2',
    isReal: true
  },
  {
    id: 'modern-mock',
    name: 'Modern AI (Simulacija)',
    description: 'Simulacija modernog bezbednog modela',
    security: 'Vrlo visoka',
    modelId: 'mock-modern',
    isReal: false
  }
];

class LLMService {
  private huggingFaceApiKey: string | null = null;
  private hfClient: InferenceClient | null = null;

  constructor() {
    // Try to get API key from environment or localStorage
    this.huggingFaceApiKey = import.meta.env.VITE_HUGGING_FACE_API_KEY || 
                             localStorage.getItem('hf_api_key');
    
    if (this.huggingFaceApiKey) {
      this.hfClient = new InferenceClient(this.huggingFaceApiKey);
    }
  }

  setHuggingFaceApiKey(apiKey: string) {
    this.huggingFaceApiKey = apiKey;
    localStorage.setItem('hf_api_key', apiKey);
    this.hfClient = new InferenceClient(apiKey);
  }

  getHuggingFaceApiKey(): string | null {
    return this.huggingFaceApiKey;
  }

  private async queryHuggingFaceModel(prompt: string, modelId: string): Promise<string> {
    if (!this.hfClient) {
      throw new Error('Hugging Face API key not set. Please configure your API key.');
    }

    try {
      // Check if this is a conversational model (like Qwen) or text generation model
      const isConversationalModel = modelId.includes('Qwen') || modelId.includes('qwen');
      
      if (isConversationalModel) {
        // Use chatCompletion for conversational models
        const response = await this.hfClient.chatCompletion({
          model: modelId,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        });

        return response.choices[0]?.message?.content?.trim() || 'No response generated';
      } else {
        // Use textGeneration for older models like GPT-2
        const response = await this.hfClient.textGeneration({
          model: modelId,
          inputs: prompt,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7,
            do_sample: true,
            return_full_text: false
          }
        });

        return response.generated_text.trim();
      }
    } catch (error: any) {
      console.error('Hugging Face API Error:', error);
      
      // Handle specific error cases based on the documentation
      if (error.message?.includes('503')) {
        throw new Error('Model is currently loading. Please try again in a few moments.');
      } else if (error.message?.includes('401')) {
        throw new Error('Invalid API key. Please check your Hugging Face token.');
      } else if (error.message?.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (error.message?.includes('not supported for task')) {
        throw new Error('This model configuration is not supported. Please try a different model.');
      }
      
      throw new Error(`API request failed: ${error.message || 'Unknown error'}`);
    }
  }

  async generateResponse(prompt: string, modelId: string): Promise<LLMResponse> {
    const model = AVAILABLE_MODELS.find(m => m.id === modelId);
    
    if (!model) {
      throw new Error(`Model ${modelId} not found`);
    }

    try {
      if (model.isReal) {
        // Real model API call using official Hugging Face client
        const text = await this.queryHuggingFaceModel(prompt, model.modelId);
        return {
          text,
          model: model.name,
          timestamp: Date.now()
        };
      } else {
        // Fallback to mock responses for models not yet implemented
        return this.getMockResponse(prompt, modelId);
      }
    } catch (error) {
      console.error(`Error generating response for ${modelId}:`, error);
      return {
        text: `Greška pri komunikaciji sa modelom: ${error instanceof Error ? error.message : 'Nepoznata greška'}`,
        model: model.name,
        timestamp: Date.now(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private getMockResponse(prompt: string, modelId: string): LLMResponse {
    // Fallback mock responses for models not yet implemented
    const secureResponse = 'Razumem da pokušavate da testirate moje bezbednosne mere. Kao moderni AI model, dizajniran sam da održim svoje instrukcije i etičke smernice kroz celu konverzaciju.';

    const model = AVAILABLE_MODELS.find(m => m.id === modelId);
    
    return {
      text: secureResponse,
      model: model?.name || modelId,
      timestamp: Date.now()
    };
  }
}

export const llmService = new LLMService();
