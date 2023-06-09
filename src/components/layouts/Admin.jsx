import React from "react";

import { AdminSideBar } from "..";

const Admin = ({ children }) => {
  return (
    <div className="min-h-screen ">
      <h1 className="text-3xl text-center md:-mr-48 py-5">Admin Panel</h1>
      <AdminSideBar>{children}</AdminSideBar>
    </div>
  );
};

export default Admin;
