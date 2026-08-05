# Telecom Mongolia web

## AI chatbot setup

The chatbot is mounted globally from `src/app/layout.tsx`. Its main files are:

- `src/components/chatbot.tsx` — browser chat interface
- `src/app/api/chat/route.ts` — protected server-side OpenAI endpoint
- `src/lib/chatbot/prompt.ts` — tone, safety rules, and verified site knowledge

Copy `.env.example` to `.env.local`, then paste a newly-created OpenAI API key:

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.6-sol
```

Never prefix the key with `NEXT_PUBLIC_`, commit `.env.local`, or expose it in
client-side code. Restart `npm run dev` after changing environment variables.

## Development

```bash
npm install
npm run dev
```
