import React, { useState } from "react";
import api from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/admin/login", { email, password });
      if (res.success && res.token) {
        localStorage.setItem("admin_token", res.token);
        window.location.href = "/dashboard";
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Login error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Admin Login</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full brand-btn px-3 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
