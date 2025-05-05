import FacebookGetList from "../components/FbList components/FbGetList.js";
import NavbarList from "../components/FbList components/NavbarList.js";
import { useNavigate } from "react-router-dom";
import React from "react";
import { RefreshButton } from "../components/utilities/RefreshButton.js";

function FbSummary() {
  const navigate = useNavigate();

  const goToPage = (page) => {
    // Navigate to a specific page
    navigate(page);
  };

  return (
    <div className="w-full">
      <NavbarList title="Post Summary" />
      <div className="w-full flex justify-center">
        <button
          className="m-2 my-facebook-button"
          onClick={() => goToPage("/FbDetail")}
        >
          New job
        </button>
        <RefreshButton />
      </div>
      <div className="flex gap-1" style={{ height: "620px" }}>
        <FacebookGetList />
      </div>
    </div>
  );
}
export default FbSummary;
