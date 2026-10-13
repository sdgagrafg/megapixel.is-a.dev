export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  const apiPaths = [
    "/songs", "/sh/", "/cmd/", "/ps1/", "/frames/",
    "/audio/", "/health", "/whoami", "/manage",
    "/add", "/debug-meta"
  ];

  const isApi = apiPaths.some(p => 
    url.pathname === p || url.pathname.startsWith(p)
  );

  if (isApi) {
    // Forward to PythonAnywhere
    const target = new URL(request.url);
    target.hostname = "megapixel.pythonanywhere.com";
    target.protocol = "https:";

    const newRequest = new Request(target.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "follow"
    });

    newRequest.headers.set("Host", "megapixel.pythonanywhere.com");
    return fetch(newRequest);
  }

  // For everything else, serve the normal HTML website
  return context.next();
}
