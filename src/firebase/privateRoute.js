import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  console.log(`login status`, userLoggedIn);

  if (!userLoggedIn) {
    navigate("/UserLogin", { replace: true });
    return null; // Return null if the user is not logged in to prevent rendering the original element
  }

  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
