type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export class ChatRoom {
  state: DurableObjectState;
  env: Env;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const body = (await request.json()) as { message: string };
    const userMessage = body.message;

    const history =
      (await this.state.storage.get<ChatMessage[]>("history")) || [];

    const messages: ChatMessage[] = [
      {
        role: "system",
        content:
          "You are a helpful study assistant for a Computer Science student. Give clear, concise, and accurate answers."
      },
      ...history,
      { role: "user", content: userMessage }
    ];

    const result = await this.env.AI.run(
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      { messages }
    );

    const reply =
      (result as { response?: string }).response ||
      "Sorry, I could not generate a response.";

    const newHistory: ChatMessage[] = [
      ...history,
      { role: "user", content: userMessage },
      { role: "assistant", content: reply }
    ].slice(-20);

    await this.state.storage.put("history", newHistory);

    return Response.json({ response: reply });
  }
}