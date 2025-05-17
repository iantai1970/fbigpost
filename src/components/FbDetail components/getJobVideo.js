import axios from "axios";
import constructURL from "../utilities/ConstructURL.js";

export const getJobVideo = async (
  job_id,
  setSelectedVideo,
  setExistingVideoId
) => {
  console.log(`getJobVideo() job_id: ${job_id}`);
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
    console.log(`get-video result`, response.data[0]);

    if (response.data === "") {
      // If response.data is an empty string
      setSelectedVideo(null);
    } else {
      console.log(
        `getJobVideo() response.data.file_path`,
        response.data[0].file_path
      );
      console.log(
        `getJobVideo() response.data.video_id`,
        response.data[0].video_id
      );

      const tmpSelectedFile = {
        src: response.data[0].file_path,
        videoId: response.data[0].video_id,
      };
      setSelectedVideo(tmpSelectedFile); // Handle error appropriately
      setExistingVideoId(tmpSelectedFile.videoId);
      console.log(`getJobVideo() selectedFile`, tmpSelectedFile);
      console.log(`getJobVideo() existingVideoId`, tmpSelectedFile.videoId);
    }
  } catch (error) {
    console.error("Error fetching Image data:", error);
    setSelectedVideo(null); // Handle error appropriately
  }
};

export default getJobVideo;
