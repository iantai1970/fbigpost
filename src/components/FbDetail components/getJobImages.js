import axios from "axios";
import constructURL from "../utilities/ConstructURL.js";

export const getJobImages = async (job_id, setFbImages, setExistingImgId) => {
  try {
    const connectionURL = constructURL(`api/get-images`);
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
      setFbImages([]);
    } else {
      // If response.data is not an empty string & local implementation
      let tmpExistingImgId = [];
      const tmpImages = response.data.map((item) => {
        //local implementation needs to add serverHost only
        //const tmpFilePath = `${serverHost}/${item.file_path}`;
        const tmpFilePath = `${item.file_path}`;
        tmpExistingImgId.push(
          item.image_id /*{
          imageId: item.image_id,
          imageKey: item.image_key,
        }*/
        );
        return {
          src: tmpFilePath,
          imageId: item.image_id,
          imageKey: item.image_key,
        }; // Return both fields
      });
      console.log(`setting FbImages`, tmpImages);
      console.log(`setting existing Image Id`, tmpExistingImgId);
      setFbImages(tmpImages); // Handle error appropriately
      setExistingImgId(tmpExistingImgId);
    }
  } catch (error) {
    console.error("Error fetching Image data:", error);
    setFbImages([]); // Handle error appropriately
  }
};

export default getJobImages;
