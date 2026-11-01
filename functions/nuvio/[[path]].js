export async function onRequest({ request }) {
  const u = new URL(request.url);
  const target = "https://nuvio-0ufk.onrender.com" + u.pathname.replace(/^\/nuvio/, "") + u.search;
  return fetch(new Request(target, request));
}
