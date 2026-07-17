import React from "react";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          Total Items
          <br />
          <span className="text-3xl font-bold">--</span>
        </div>
        <div className="p-4 bg-white rounded shadow">
          Categories
          <br />
          <span className="text-3xl font-bold">--</span>
        </div>
        <div className="p-4 bg-white rounded shadow">
          Orders
          <br />
          <span className="text-3xl font-bold">--</span>
        </div>
      </div>
    </div>
  );
}
