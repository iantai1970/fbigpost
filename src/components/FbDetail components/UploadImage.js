import deleteImage from "../../assets/deleteimage.jpg";
import React from "react";

function UploadImage({
  fbImages,
  setFbImages,
  existingImgId,
  setExistingImgId,
}) {
  const fileInputRef = React.createRef();

  const handleImageChange = (e) => {
    console.log(`UploadImages : handleImageChange`, e);
    const file = e.target.files[0]; // Get the first selected file
    console.log(`inside handleImageChange e.target.file[0]`, e.target.files[0]); //shown file content

    if (!file) {
      return; // No file selected
    }

    if (fbImages.length >= 4) {
      alert("You can only upload a maximum of 4 images.");
      return;
    }

    console.log("reading image file");
    const reader = new FileReader();

    reader.onload = (event) => {
      //const readResult = reader.readAsDataURL(file);
      //console.log("URL of image", readResult);
      setFbImages((prevImages) => [
        ...prevImages,
        { src: event.target.result, file: file },
      ]);
    };

    let readResult;
    readResult = reader.readAsDataURL(file);
    console.log("URL of image", readResult);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...fbImages];
    const newImgId = [...existingImgId];
    newImages.splice(index, 1);
    newImgId.splice(index, 1);
    setFbImages(newImages);
    setExistingImgId(newImgId);
    console.log(`UploadImages : after remove images`, newImages, newImgId);
    fileInputRef.current.value = null; // Clear the value of the file input
  };

  return (
    <div>
      <div>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          className="text-sm w-full p-1"
          ref={fileInputRef}
        />
      </div>

      <div className="image-grid">
        {fbImages.map((fbImage, index) => (
          <div key={index} className="image-container">
            <img
              src={fbImage.src}
              alt={`Post Pic ${index + 1}`}
              className="image"
            />
            <button
              style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleRemoveImage(index)}
            >
              <img
                src={deleteImage}
                alt="Delete"
                style={{
                  margin: 0,
                  width: "20px",
                  height: "20px",
                }}
              ></img>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadImage;
