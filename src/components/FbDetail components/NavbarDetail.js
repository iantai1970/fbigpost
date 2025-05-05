import React from "react";
import { useNavigate } from "react-router-dom";

function NavbarDetail({ title, jobId }) {
  const navigate = useNavigate();
  console.log(`NavbarDetail jobId`, jobId);

  const goBack = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  const titleText = !jobId ? `(New Job)` : `(Job ID: ${jobId})`;

  return (
    <div className="bg-blue-800 p-2 flex items-center">
      <div className="text-center flex-grow font-bold text-white">
        {title} {titleText}
      </div>
      <div
        className="ml-auto text-white pr-3 cursor-pointer hover:cursor-pointer  text-sm"
        onClick={goBack}
      >
        Back
      </div>
    </div>
  );
}
export default NavbarDetail;
