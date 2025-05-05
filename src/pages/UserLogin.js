import { useState, useEffect } from "react";
import { doSignInWithEmailAndPassword, doSignOut } from "../firebase/auth.js";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

const UserLogin = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginErrMsg, setLoginErrMsg] = useState(""); // To display login errors
  const [passwordVisible, setPasswordVisible] = useState(false); // New state

  const { userLoggedIn } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithEmailAndPassword(userEmail, userPassword);
      // If login succeeds, the authContext should update userLoggedIn
    } catch (error) {
      // Handle the error, e.g., set an error message state
      console.error("Login failed:", error.message);
      setLoginErrMsg(error.message); // If you want to display an error
    }
  };

  useEffect(() => {
    // Perform logout when the component mounts (before the first render)
    const logoutBeforeRender = async () => {
      try {
        await doSignOut(); // Assuming you have a logout function like doSignOut
      } catch (error) {
        console.error("Logout failed:", error.message);
      }
    };

    logoutBeforeRender();
  }, []); // Empty dependency array to only run this effect once

  return (
    <div className="w-full">
      {userLoggedIn && <Navigate to={"/FbSummary"} replace={true} />}
      <div className="section w-1/3 mx-auto my-20">
        <div className="sectionHeader h-8">Login</div>
        {loginErrMsg && <p className="text-red-500">{loginErrMsg}</p>}{" "}
        {/* Display error message */}
        <form onSubmit={onSubmit}>
          <div className="m-4">
            <p>Email</p>
            <input
              type="Text"
              id="1"
              name="Email"
              placeholder="Enter email address"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="border-2 border-blue-100 w-full m-2"
            />
          </div>
          <div className="m-4">
            <p>Password</p>
            <div className="relative">
              <input
                id="2"
                name="hs-toggle-password"
                placeholder="Enter password"
                type={passwordVisible ? "text" : "password"} // Toggle type
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="border-2 border-blue-100 w-full m-2"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility} // Use onClick
                className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
              >
                {/* Conditionally render the eye icon based on passwordVisible */}
                {passwordVisible ? (
                  // Eye Visible Icon (replace with your preferred icon)
                  <svg
                    className="shrink-0 size-3.5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  // Eye Hidden Icon (replace with your preferred icon)
                  <svg
                    className="shrink-0 size-3.5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="w-full m-2 flex justify-center items-center">
            <button type="submit" className="my-facebook-button w-36">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
