const BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

async function request(path, opts = {}) {
  // normalize to backend mount at /api
  const apiPath = path.startsWith("/api")
    ? path
    : `/api${path.startsWith("/") ? "" : "/"}${path}`;
  const url = `${BASE}${apiPath}`;
  const headers = opts.headers || {};
  const token = localStorage.getItem("admin_token");
  if (token) headers["authorization"] = `Bearer ${token}`;
  const res = await fetch(url, { ...opts, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "API error");
  return data;
}

export default {
  get: (p) => request(p, { method: "GET" }),
  post: (p, body) =>
    request(p, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }),
  postForm: (p, form) => request(p, { method: "POST", body: form }),
  put: (p, body) =>
    request(p, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }),
  delete: (p) => request(p, { method: "DELETE" }),
};
