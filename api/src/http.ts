/** Bindings and settings Cloudflare injects (wrangler.toml, secrets, .dev.vars locally). */
export interface Env {
	DB: D1Database;
	/** Comma-separated origins allowed to call the API and to receive a login. */
	ALLOWED_ORIGINS: string;
	/** Secrets. Any missing one makes the endpoints that need it answer "not_configured". */
	GITHUB_CLIENT_ID?: string;
	GITHUB_CLIENT_SECRET?: string;
	SESSION_SECRET?: string;
}

export function allowedOrigins(env: Env): string[] {
	return env.ALLOWED_ORIGINS.split(',')
		.map((o) => o.trim())
		.filter(Boolean);
}

export function corsHeaders(origin: string | null): Record<string, string> {
	const headers: Record<string, string> = {
		'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		'Access-Control-Max-Age': '86400',
		Vary: 'Origin',
	};
	if (origin) headers['Access-Control-Allow-Origin'] = origin;
	return headers;
}

export function json(data: unknown, status: number, cors: Record<string, string>, cache = 'no-store'): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { ...cors, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cache },
	});
}

/** A short plain-text page, for the login pages a person actually lands on. */
export function textPage(message: string, status: number): Response {
	return new Response(message, {
		status,
		headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
	});
}

