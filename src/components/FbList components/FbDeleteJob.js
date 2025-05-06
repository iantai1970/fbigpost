import axios from "axios";
import constructURL from "../utilities/ConstructURL.js";

export async function FbDeleteJob(jobId) {
  console.log("FbDeleteJob->job Id:", jobId);
  const connectionURL = constructURL("api/facebook-delete-job");
  try {
    const serverResponse = await axios.post(
      connectionURL,
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
