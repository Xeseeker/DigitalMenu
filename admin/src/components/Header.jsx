import React from "react";

export default function Header() {
  const logout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded flex items-center justify-center text-white font-bold">
            DM
          </div>
          <h1 className="text-xl font-semibold">Digital Menu — Admin</h1>
        </div>
        <div>
          <button onClick={logout} className="px-3 py-1 rounded border text-sm">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
