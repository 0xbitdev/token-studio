# OpenAI Generation (local dev)

This project includes an API route that uses OpenAI to generate token metadata and images for the `Generate & Create` UI.

## Required env

Create a `.env.local` at project root with:

```
OPENAI_API_KEY=sk-...
# optional: override models
OPENAI_CHAT_MODEL=gpt-4o-mini
OPENAI_IMAGE_MODEL=gpt-image-1
```

## Run locally

1. Install dependencies (pnpm or npm):

```powershell
npm install
# or
pnpm install
```

2. Start dev server:

```powershell
npm run dev
```

3. Open http://localhost:3000 and navigate to the Generate page. Fill the textarea and click "Generate & Create".

## Behavior & limitations

- The API route `app/api/generate/route.ts` calls the Chat Completion API to produce structured JSON (metadata + prompts) and then calls the Images API twice to produce the picture and cover images.
- If image generation fails (no access or other error), the API will return local fallback images from `public/` so the UI still shows a preview.
- The route expects the chat model to return valid JSON; it attempts to parse the raw text and extract a JSON object if the model emits extra text.
- Generating chat + 2 images can be costly. Use sparingly during development.

## Troubleshooting

- 401/403 from OpenAI: check the API key and account access to the requested models.
- No image appears even after success: check server logs for image generation errors; also ensure `public/` contains the fallback images referenced.

