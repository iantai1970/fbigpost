import axios from "axios";
import constructURL from "../utilities/ConstructURL.js";

export default async function getJobData(jobId, setJobData) {
  try {
    if (!jobId) {
      throw new Error("Invalid job ID provided");
    }

    const connectionURL = constructURL("api/get-job");
    const response = await axios.post(
      connectionURL,
      {
        job_id: jobId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response && response.data) {
      setJobData(response.data);
    } else {
      throw new Error("No data received from the server");
    }
  } catch (error) {
    console.error("Error fetching job data:", error);
    setJobData(null); // Handle error appropriately
  }
}
