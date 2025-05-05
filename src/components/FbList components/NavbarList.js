import React from "react";
import { useNavigate } from "react-router-dom";
import { SignOutAndReturn } from "../utilities/SignOutAndReturn.js";

function NavbarList({ title }) {
  const navigate = useNavigate();

  function handleLogout() {
    SignOutAndReturn(navigate);
  }

  return (
    <div className="bg-blue-800 p-2 flex items-center">
      <div className="text-center flex-grow font-bold text-white">{title}</div>
      <div
        className="ml-auto text-white pr-3 cursor-pointer hover:cursor-pointer text-sm"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
}
export default NavbarList;
