import axios from "axios";

const serverHost = process.env.REACT_APP_API_URL;
const serverPort = process.env.REACT_APP_API_PORT;

export async function FbDeleteJob(jobId) {
  console.log("FbDeleteJob->job Id:", jobId);
  const postURL = `${serverHost}:${serverPort}/api/facebook-delete-job`;
  try {
    const serverResponse = await axios.post(
      postURL,
      {
        jobId: jobId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = serverResponse.data;

    if (serverResponse.status === 200) {
      console.log("FbDeleteJob->Delete Job Success");
      alert(`job ID ${jobId} is deleted successfully !!`);
    } else {
      console.error("FbDeleteJob->Delete Job failed", data.error);
      alert(`Cannot Delete Job Id ${jobId} with error` + data.error);
    }
  } catch (error) {
    console.error("FbDeleteJob->Delete Job Network failed", error);
    alert(`Cannot Delete Job Id ${jobId} with error`, error);
  }
}
