/**
 * Catch-all handler - serves index.html for root path
 */
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Only handle root path
  if (url.pathname === '/' || url.pathname === '') {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/index.html'
      }
    });
  }
  
  // Let other requests pass through
  return new Response('Not Found', { status: 404 });
}
