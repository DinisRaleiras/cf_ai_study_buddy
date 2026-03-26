# cf_ai_study_buddy

This project is a simple AI-powered study assistant built using Cloudflare’s developer platform.

## What this is

I built this project as a small but complete example of an AI application that can handle conversations with memory. The goal was to keep it simple while showing how different parts of the platform work together in a real application.

The app lets a user send messages and receive responses from a language model while keeping the conversation context across multiple messages.

## What it does

- Chat interface for user input
- AI-generated responses
- Conversation memory per session
- Clear chat option to start a new session

## Tech used

- Cloudflare Workers
- Workers AI
- Durable Objects
- TypeScript
- HTML, CSS and JavaScript

## How it works

When the user sends a message, the request is handled by a Cloudflare Worker.

Each conversation is associated with a Durable Object, which stores the message history for that specific session.

That history is sent to Workers AI so the model can respond with context. The new exchange is then stored, allowing the conversation to continue naturally.

## Running locally

```bash
npm install
npm run dev
````

## Deploy

````bash
npm run deploy
```