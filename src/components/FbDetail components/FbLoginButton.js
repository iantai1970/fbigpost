import FacebookLogin from "react-facebook-login";
import axios from "axios";

async function SendAccessTokenToServer(response, setEmail, loggedIn, setLogin) {
  const serverHost = process.env.REACT_APP_API_URL;
  const serverPort = process.env.REACT_APP_API_PORT;

  console.log("FbButton->SendAccessTokenToServer", serverHost, serverPort);
  const postURL = `${serverHost}:${serverPort}/api/facebook-login`;
  console.log(`postURL `, postURL);
  if (response.accessToken && response.email) {
    try {
      const serverResponse = await axios.post(
        postURL,
        {
          accessToken: response.accessToken,
          email: response.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = serverResponse.data;

      if (serverResponse.status === 200) {
        console.log(
          "FbButton->SendAccessTokenToServer: Long Live token stored successfully!",
          data
        );
        setLogin(true);
        setEmail(response.email);
        alert("Login successful!");
      } else {
        console.error("FbButton->SendAccessTokenToServer: Server error:", data);
        alert("Login failed: " + data.error);
        setLogin(false);
      }
    } catch (error) {
      console.error("FbButton->SendAccessTokenToServer: Network error:", error);
      alert("Login failed: Network error");
      setLogin(false);
    }
  } else {
    alert("Login failed: Could not retrieve access token or email.");
  }
}

const componentClicked = (setLogin, setEmail) => {
  console.log("FbButton->ComponentClicked:");
  //setLogin(false);
  //setEmail("");
};

function FacebookLoginButton({ email, setEmail, loggedIn, setLogin }) {
  // const [accessToken, setAccessToken] = useState(null);
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

  console.log("render FacebookLoginButton email", email);
  console.log("render FacebookLoginButton loggedIn", loggedIn);
  console.log(`Facebook App ID ${facebookAppId}`);

  setLogin(false);

  const responseFacebook = (response) => {
    console.log("FbButton: Facebook Login response received");

    if (response.accessToken) {
      // Login was successful
      console.log("FbButton: Login successful!");
      console.log("FbButton: Access Token:", response.accessToken);
      console.log("FbButton: User ID:", response.userID);
      console.log("FbButton: User Name:", response.name);

      // setAccessToken(response.accessToken);
      SendAccessTokenToServer(response, setEmail, loggedIn, setLogin);
    } else {
      // Login failed or was cancelled
      console.log("FbButton: Login failed or cancelled.");
      if (response.error) {
        console.error("FbButton: Facebook Login Error:", response.error);
        // Handle the error appropriately (e.g., display an error message to the user)
      }
      alert("Login failed !!");
    }
  };

  return (
    <div className="justify-center text-center pb-1">
      <FacebookLogin
        appId={facebookAppId} // Replace with your actual App ID
        textButton="Login Facebook"
        autoLoad={false}
        fields="name,email,picture" // Specifies the data you want to get from the user's profile
        scope="public_profile,
      email,
      pages_show_list,
      pages_messaging,
      pages_manage_metadata"
        cssClass="my-facebook-button" // Add a CSS class
        onClick={componentClicked(setLogin, setEmail)}
        callback={responseFacebook}
      />
    </div>
  );
}

export default FacebookLoginButton;
