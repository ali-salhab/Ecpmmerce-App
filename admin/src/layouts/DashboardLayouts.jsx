import React from "react";
import { Outlet } from "react-router";

function DashboardLayouts() {
  return (
    <div>
      <h1>sidebar</h1>
      <h1>navbar</h1>
      <Outlet />
    </div>
  );
}

export default DashboardLayouts;
