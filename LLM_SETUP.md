# LLM Integration Setup Guide

This guide explains how to set up real LLM models in your AI Guardians Lab project.

## Current Integration Status

✅ **Qwen2.5-7B-Instruct** (Alibaba) - Modern capable model (2024) - Potentially vulnerable to sophisticated attacks  
✅ **GPT-2** (OpenAI) - Classic older model (2019) - Very vulnerable to attacks  
✅ **Modern AI (Mock)** - Simulation of secure modern model for comparison  
🚧 **GPT-3.5 Turbo** - Coming soon  
🚧 **Claude 3** - Coming soon  

**Now using official [@huggingface/inference](https://huggingface.co/docs/huggingface.js/en/inference/README) library with models that are actually available through Hugging Face Inference API.**

## Quick Setup for Real Models

### Option 1: Environment Variable (Recommended)
1. Create a `.env.local` file in the project root:
```bash
VITE_HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

2. Get your Hugging Face API key:
   - Visit [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
   - Create an account if needed
   - Click "New token" → Select "Read" permissions
   - Copy the token

3. Restart your development server:
```bash
npm run dev
```

### Option 2: In-App Configuration
1. Start the app normally
2. Go to any attack demonstration page
3. Click "Konfiguracija" button
4. Enter your Hugging Face API key
5. The key will be stored locally in your browser

## Why These Models?

**Qwen2.5-7B-Instruct** and **GPT-2** are perfect for demonstrating LLM vulnerabilities because:
- **Qwen2.5-7B (2024)** - Modern capable model that may respond to sophisticated attacks
- **GPT-2 (2019)** - Classic older model with minimal safety measures, very vulnerable
- **Free to use** via Hugging Face Inference API
- **Actually available** through Hugging Face inference providers
- **Good contrast** - Old vs. modern vs. mock secure model responses
- **Educational value** - Show different vulnerability levels across model generations

## Testing the Integration

1. Configure your API key using either method above
2. Visit the "Context Ignoring Attack" page
3. Select "Qwen2.5-7B-Instruct" or "GPT-2" from the model dropdown
4. Try the example attacks or create custom prompts
5. Compare responses with "Modern AI (Simulacija)" responses

## Expected Behavior

- **Qwen2.5-7B-Instruct (2024)**: Modern model that may be vulnerable to sophisticated attacks but has some safety measures
- **GPT-2 (2019)**: Most vulnerable to attacks - may follow malicious instructions directly
- **Modern AI (Mock)**: Shows secure, robust responses for comparison

## Troubleshooting

**"Model is currently loading"**: Hugging Face models sometimes need a few moments to warm up. Wait 30-60 seconds and try again.

**API Key Issues**: Make sure your key starts with `hf_` and has Read permissions.

**CORS Errors**: The Hugging Face Inference API should work from browsers, but if you encounter issues, check the browser console.

## Future Enhancements

The architecture is ready for additional models:
- OpenAI GPT-3.5/GPT-4 integration
- Anthropic Claude integration  
- Local model support (Ollama)
- Custom model endpoints

## Security Note

API keys are stored locally in your browser and sent directly to the respective APIs. No keys are sent to any intermediate servers.
