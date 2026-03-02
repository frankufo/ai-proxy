/**
 * OpenAI API Proxy - Cloudflare Pages Function
 * Handles all /openai/* routes
 */

const OPENAI_API_BASE = 'https://api.openai.com';

export async function onRequest(context) {
    const { request } = context;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '86400',
            },
        });
    }

    const url = new URL(request.url);
    // Remove /openai prefix to get the actual API path
    const path = url.pathname.replace(/^\/openai/, '') || '/';
    const targetUrl = `${OPENAI_API_BASE}${path}${url.search}`;

    // Clone and forward headers
    const headers = new Headers(request.headers);
    headers.delete('host');

    const init = {
        method: request.method,
        headers: headers,
    };

    // Forward body for non-GET requests
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        init.body = request.body;
        init.duplex = 'half';
    }

    try {
        const response = await fetch(targetUrl, init);

        // Create new response with CORS headers
        const newHeaders = new Headers(response.headers);
        newHeaders.set('Access-Control-Allow-Origin', '*');
        newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        newHeaders.set('Access-Control-Allow-Headers', '*');

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
}
