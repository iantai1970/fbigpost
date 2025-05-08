import axios from "axios";
import constructURL from "../utilities/ConstructURL";

async function SendtoStore(
  email,
  selectFrom,
  selectTo,
  freqOption,
  Xminute,
  Xhour,
  Yminute,
  postText,
  fbImages,
  existingImgId,
  selectedPageID,
  selectedPageToken,
  jobId,
  isChecked
) {
  console.log(`SaveToSchedule->sentToStore, email=${email}, selectFrom=${selectFrom}, selectTo=${selectTo}, 
      freqOption=${freqOption}, Xminute=${Xminute}, Yminute=${Yminute}, Xhour=${Xhour}, postText=${postText}, 
      fbImages=${fbImages}, selectedPageID=${selectedPageID}, existingImgId=${existingImgId}, jobId=${jobId}, isChecked=${isChecked}`);

  const formData = new FormData();
  formData.append("email", email);
  formData.append("selectFrom", selectFrom);
  formData.append("selectTo", selectTo);
  formData.append("freqOption", freqOption);
  formData.append("Xminute", Xminute);
  formData.append("Xhour", Xhour);
  formData.append("Yminute", Yminute);
  formData.append("postText", postText);
  formData.append("selectedPageID", selectedPageID);
  formData.append("selectedPageToken", selectedPageToken);
  formData.append("isChecked", isChecked);
  console.log(`fbImages Length ${fbImages.length}`);
  for (let i = 0; i < fbImages.length; i++) {
    formData.append(`images`, fbImages[i].file);
    console.log(`fbImage.file ${fbImages[i].file}`);
  }
  /*fbImages.forEach((image) => {
    formData.append(`images`, image.file);
    console.log (`image.file ${image.file}`);
  });*/
  console.log(`existingImgId.length`, existingImgId.length);
  for (let i = 0; i < existingImgId.length; i++) {
    console.log(`ExistingImgId ${existingImgId}} `);
  }

  if (existingImgId.length === 0) {
    formData.append(`imgId[]`, ""); // Append an empty string or handle as needed
  } else {
    existingImgId.forEach((imgId) => {
      formData.append(`imgId[]`, imgId);
    });
  }
  formData.append("jobId", jobId);

  if (!email) {
    alert("Please login first before saving the job !!!");
    return 500;
  }
  if (!selectedPageID) {
    alert("Please wait until page comes back!!!");
    return 500;
  }

  try {
    console.log(`Uploading form data ${FormData}`);
    const connectionURL = constructURL("api/save-schedule-job");
    const serverResponse = await axios.post(connectionURL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = serverResponse.data;

    if (serverResponse.status === 200) {
      console.log("SaveToSchedule->Data upload response:", data);
      alert(data.message);
      return 200;
    } else {
      console.error("SaveToSchedule->Server error:", data);
      alert("Cannot Upload Data: " + data.error);
      return 500;
    }
  } catch (error) {
    console.error("SaveToSchedule->Network error:", error);
    alert("Cannot Upload Data: Network error");
    return 500;
  }
}

async function SaveToSchedule(
  email,
  selectFrom,
  selectTo,
  freqOption,
  Xminute,
  Xhour,
  Yminute,
  postText,
  fbImages,
  existingImgId,
  selectedPageID,
  selectedPageToken,
  jobId,
  isChecked
) {
  console.log("SaveToSchedule: parameters are email", email);
  console.log("SaveToSchedule: parameters are selectFrom", selectFrom);
  console.log("SaveToSchedule: parameters are selectTo", selectTo);
  console.log("SaveToSchedule: parameters are freqOption", freqOption);
  console.log("SaveToSchedule: parameters are Xminutes", Xminute);
  console.log("SaveToSchedule: parameters are Xhour", Xhour);
  console.log("SaveToSchedule: parameters are Yminute", Yminute);
  console.log("SaveToSchedule: parameters are postText", postText);
  console.log("SaveToSchedule: parameters are fbImages", fbImages);
  console.log("SaveToSchedule: parameters are existingImgId", existingImgId);
  console.log("SaveToSchedule: parameters are selectedPageID", selectedPageID);
  console.log("SaveToSchedule: parameters are jobId", jobId);
  console.log("SaveToSchedule: parameters are isChecked", isChecked);

  const errorCode = await SendtoStore(
    email,
    selectFrom,
    selectTo,
    freqOption,
    Xminute,
    Xhour,
    Yminute,
    postText,
    fbImages,
    existingImgId,
    selectedPageID,
    selectedPageToken,
    jobId,
    isChecked
  );
  console.log("SendtoStore Reply", errorCode);
  return errorCode;
}

export default SaveToSchedule;
