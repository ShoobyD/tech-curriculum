/**
 * The friends' room: one Durable Object that holds every open page's WebSocket and pushes each
 * change to all of them the moment it is saved.
 *
 * Workers don't share memory between requests and D1 doesn't announce changes, so this object is
 * the meeting point: the Worker saves progress to D1 as before, then calls broadcast() here.
 *
 * Sockets are accepted with the Hibernation API: while nothing happens the object sleeps and is
 * not billed for duration, even with pages connected. The pages' keepalive "ping" is answered
 * with "pong" by the runtime itself, without waking the object.
 *
 * Messages (JSON, server to page only; everything in them is public, as in GET /friends):
 *   {type: "progress", friend: {id, login, name, avatar, done: {itemId: timestamp}, updatedAt}}
 *   {type: "deleted", id}
 */
import { DurableObject } from 'cloudflare:workers';
import type { Env } from './http';

export class Room extends DurableObject<Env> {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		this.ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('ping', 'pong'));
	}

	/** A page joining: the Worker already checked that this is a WebSocket upgrade from the site. */
	async fetch(): Promise<Response> {
		const pair = new WebSocketPair();
		this.ctx.acceptWebSocket(pair[1]);
		return new Response(null, { status: 101, webSocket: pair[0] });
	}

	/** Sends one message to every connected page. A page that went away is skipped. */
	async broadcast(message: string): Promise<number> {
		let sent = 0;
		for (const ws of this.ctx.getWebSockets()) {
			try {
				ws.send(message);
				sent++;
			} catch {
				// already closing; the runtime cleans it up
			}
		}
		return sent;
	}

	// Pages only send the keepalive ping (answered without waking us); anything else is ignored.
	async webSocketMessage(): Promise<void> {}

	async webSocketClose(ws: WebSocket, code: number): Promise<void> {
		// complete the closing handshake; 1005/1006 are reserved and can't be sent back
		try {
			ws.close(code === 1005 || code === 1006 ? 1000 : code, 'bye');
		} catch {
			// already closed
		}
	}
}

