export default function constructURL(apiString) {
  const serverHost = process.env.REACT_APP_API_URL;
  const serverPort = process.env.REACT_APP_API_PORT;

  if (serverHost === "http://localhost") {
    return `${serverHost}:${serverPort}/${apiString}`;
  } else {
    return `${serverHost}/${apiString}`;
  }
}
