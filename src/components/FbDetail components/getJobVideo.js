import axios from "axios";
import constructURL from "../utilities/ConstructURL.js";

export const getJobVideo = async (
  job_id,
  setSelectedVideo,
  setExistingVideoId
) => {
  try {
    const connectionURL = constructURL(`api/get-video`);
    const response = await axios.post(
      connectionURL,
      {
        job_id: job_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`get-images result`, response.data);

    if (response.data === "") {
      // If response.data is an empty string
      setSelectedVideo(null);
    } else {
      const selectedFile = {
        src: response.data.file_path,
        videoId: response.data.video_id,
      };
      setSelectedVideo(selectedFile); // Handle error appropriately
      setExistingVideoId(selectedFile.videoId);
    }
  } catch (error) {
    console.error("Error fetching Image data:", error);
    setSelectedVideo(null); // Handle error appropriately
  }
};

export default getJobVideo;
