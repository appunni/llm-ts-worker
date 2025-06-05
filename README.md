# Generic LLM Worker Example

This example demonstrates how to use the `generic-llm-worker.ts` to run large language models directly in the browser using HuggingFace Transformers and WebGPU acceleration.

> 🤖 **Built with GitHub Copilot** - This project was developed with the assistance of GitHub Copilot for enhanced productivity and code quality.

## Features

- ✅ **Modern Tech Stack**: Vite + TypeScript + Tailwind CSS (with Vite plugin)
- ✅ **WebGPU Acceleration**: Hardware-accelerated inference
- ✅ **Two Generation Modes**: Chat conversations vs single responses
- ✅ **Real-time Streaming**: Live token generation with performance stats
- ✅ **Progress Tracking**: Visual progress bars during model loading
- ✅ **Session Management**: Conversation history with context preservation
- ✅ **Dark/Light Theme**: Automatic theme detection
- ✅ **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Prerequisites

- Node.js 18+ 
- A modern browser with WebGPU support (Chrome 113+, Edge 113+)
- At least 2GB of available RAM

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage

1. **Check WebGPU Support**: The app will automatically detect WebGPU availability
2. **Select a Model**: Choose between SmolLM2 360M (lightweight) or 1.7B (better quality)
3. **Load Model**: Click "Load Model" and wait for download/initialization
4. **Choose Mode**: 
   - **Chat Mode**: Maintains conversation history
   - **Single Response**: Independent responses without context
5. **Start Chatting**: Type your message and press Enter or click Send

## Available Models

| Model | Size | Description | Use Case |
|-------|------|-------------|----------|
| SmolLM2 360M | ~300MB | Lightweight, fast responses | Quick tests, mobile devices |
| SmolLM2 1.7B | ~1.1GB | Better quality, slower | General purpose, desktop |

## Performance Tips

- **First Load**: Models are downloaded and cached on first use
- **WebGPU**: Ensure your browser supports WebGPU for best performance
- **RAM Usage**: Close other tabs to free up memory for larger models
- **Temperature**: Lower values (0.1-0.3) for focused responses, higher (0.7-1.0) for creative

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Main Thread   │    │   Web Worker     │    │  HF Transformers │
│   (UI/Events)   │◄──►│ (Model/Compute)  │◄──►│   (Inference)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Key Components

- **`main.ts`**: UI logic, event handling, worker communication
- **`generic-llm-worker.ts`**: Worker implementation with model management
- **`types.ts`**: TypeScript definitions for type safety
- **`style.css`**: Tailwind CSS directives

## Browser Compatibility

| Browser | WebGPU Support | Status |
|---------|---------------|--------|
| Chrome 113+ | ✅ | Fully supported |
| Edge 113+ | ✅ | Fully supported |
| Firefox | ⏳ | In development |
| Safari | ⏳ | In development |

## Troubleshooting

### WebGPU Not Supported
- Update your browser to the latest version
- Enable WebGPU in browser flags if needed
- Check hardware compatibility

### Model Loading Fails
- Check internet connection
- Ensure sufficient RAM (model size + 1GB buffer)
- Try the smaller 360M model first

### Slow Performance
- Use WebGPU-compatible hardware
- Close other applications
- Reduce `max_new_tokens` in generation config

### TypeScript Errors
```bash
# Check for type errors
npm run type-check

# Watch mode for development
npm run dev
```

## Configuration

### Generation Parameters

You can modify generation settings in `main.ts`:

```typescript
generationConfig: {
  max_new_tokens: 512,    // Maximum response length
  temperature: 0.7,       // Randomness (0.0-2.0)
  top_p: 0.9,            // Nucleus sampling
  repetition_penalty: 1.1 // Avoid repetition
}
```

### Model Configuration

To add new models, update `DEFAULT_MODELS` in `generic-llm-worker.ts`:

```typescript
const DEFAULT_MODELS = {
  'my-model': {
    id: "organization/model-name",
    dtype: "q4f16",
    device: "webgpu", 
    size: 1024 * 1024 * 1024, // 1GB
    description: "My custom model"
  }
}
```

## Development

### Project Structure

```
example/
├── src/
│   ├── main.ts              # Main application logic
│   ├── generic-llm-worker.ts # Web worker implementation  
│   ├── types.ts             # TypeScript definitions
│   └── style.css            # Tailwind CSS directives
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies and scripts
```

### Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run type-check # TypeScript type checking
```

### Vite Configuration

The project uses:
- **`@tailwindcss/vite`**: Modern Tailwind CSS integration (no PostCSS needed)
- **Worker support**: ES modules in web workers
- **CORS headers**: Required for SharedArrayBuffer/WebGPU

## Resources

- [HuggingFace Transformers.js](https://huggingface.co/docs/transformers.js)
- [WebGPU Specification](https://www.w3.org/TR/webgpu/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
