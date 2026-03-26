import { ChatRoom } from "./chat-room";

export { ChatRoom };

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/api/chat" && request.method === "POST") {
			const body = (await request.json()) as {
				sessionId: string;
				message: string;
			};

			const id = env.CHAT_ROOM.idFromName(body.sessionId);
			const stub = env.CHAT_ROOM.get(id);

			return stub.fetch("https://internal/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ message: body.message })
			});
		}

		return env.ASSETS.fetch(request);
	}
} satisfies ExportedHandler<Env>;