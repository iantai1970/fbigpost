import React, { useState } from "react";
import axios from "axios";
import constructURL from "../utilities/ConstructURL";

const VideoUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // 'idle', 'uploading', 'success', 'error'
  const [uploadProgress, setUploadProgress] = useState(0); // Percentage

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus("idle");
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setUploadStatus("uploading");

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      console.log(`Uploading form data `, selectedFile);
      const connectionURL = constructURL("api/upload-video");
      const response = await axios.post(connectionURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        setUploadStatus("success");
        setUploadProgress(100);
        console.log("Video uploaded successfully!");
        // Handle successful upload
      } else {
        setUploadStatus("error");
        setUploadProgress(0);
        console.error("Video upload failed.");
        // Handle upload error
      }
    } catch (error) {
      setUploadStatus("error");
      setUploadProgress(0);
      console.error("Error during video upload:", error);
      // Handle network errors or other exceptions
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {selectedFile && (
        <section>
          <h3>Selected File:</h3>
          <p>Name: {selectedFile.name}</p>
          <p>Type: {selectedFile.type}</p>
          <p>Size: {selectedFile.size} bytes</p>
          <video controls style={{ width: "100%" }}>
            <source
              src={URL.createObjectURL(selectedFile)}
              type={selectedFile.type}
            />
            Your browser does not support the video tag.
          </video>
        </section>
      )}
      {selectedFile && uploadStatus !== "uploading" && (
        <button onClick={handleUpload}>Upload Video</button>
      )}
      {uploadStatus === "uploading" && (
        <div>
          <p>Uploading... {uploadProgress}%</p>
          {/* You could add a visual progress bar here */}
        </div>
      )}
      {uploadStatus === "success" && (
        <p style={{ color: "green" }}>Upload successful!</p>
      )}
      {uploadStatus === "error" && (
        <p style={{ color: "red" }}>Upload failed. Please try again.</p>
      )}
    </div>
  );
};

export default VideoUploader;
