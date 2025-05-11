import React, { useState } from "react";

const VideoUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // 'idle', 'uploading', 'success', 'error'
  const [uploadProgress, setUploadProgress] = useState(0); // Percentage

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus("idle");
      setUploadProgress(0);

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile({ file: event.target.files[0], url: reader.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setUploadStatus("uploading");

    // Perform upload logic here
    // Replace with your actual upload logic

    setTimeout(() => {
      setUploadStatus("success");
      setUploadProgress(100);
      console.log("Video uploaded successfully!");
    }, 2000); // Simulating upload time

    // Actual upload logic would go here
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {selectedFile && (
        <section>
          <h3>Selected File:</h3>
          <p>Name: {selectedFile.file.name}</p>
          <p>Type: {selectedFile.file.type}</p>
          <p>Size: {selectedFile.file.size} bytes</p>
          <video controls style={{ width: "60%", maxWidth: "100%" }}>
            <source src={selectedFile.url} type={selectedFile.file.type} />
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
