import React from "react";
import FacebookLoginButton from "../components/FbDetail components/FbLoginButton.js";
import NavbarDetail from "../components/FbDetail components/NavbarDetail.js";
import { useState, useEffect } from "react";
import { DateFromTo } from "../components/FbDetail components/DateFromTo.js";
import ChooseFrequency from "../components/utilities/ChooseFrequency.js";
import OptionDetail from "../components/FbDetail components/OptionDetail.js";
import PostText from "../components/FbDetail components/PostText.js";
import UploadImage from "../components/FbDetail components/UploadImage.js";
import FacebookGetPages from "../components/FbDetail components/FbGetPages.js";
import SaveToSchedule from "../components/FbDetail components/SaveToSchedule.js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ActiveStatusButton from "../components/utilities/ActiveStatusButton.js";

const serverHost = process.env.REACT_APP_API_URL;
const serverPort = process.env.REACT_APP_API_PORT;

function FbDetail() {
  const [email, setEmail] = useState("");
  const [selectFrom, setSelectFrom] = useState(""); // Initialize with null
  const [selectTo, setSelectTo] = useState(""); // Initialize with null
  const [freqOption, setfreqOption] = useState(1);
  const [Xminute, setXminute] = useState(15);
  const [Xhour, setXhour] = useState(1);
  const [Yminute, setYminute] = useState(0);
  const [postText, setPostText] = useState("");
  const [fbImages, setFbImages] = useState([]);
  const [existingImgId, setExistingImgId] = useState([]);
  const [selectedPageID, setSelectedPageID] = useState("");
  const [selectedPageToken, setSelectedPageToken] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  const [loggedIn, setLogin] = useState(false);

  // handle job id from FbSummary
  const { job_id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    console.log(`useEffect get Job entered`);
    const fetchData = async () => {
      console.log(`useEffect fetch job entered`);
      if (job_id) {
        // Only fetch if job_id exists
        try {
          //const postURL = `${serverHost}:${serverPort}/api/get-job`;
          const postURL = `${serverHost}/api/get-job`;
          const response = await axios.post(
            postURL,
            {
              job_id: job_id,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          setJobData(response.data);
        } catch (error) {
          console.error("Error fetching job data:", error);
          setJobData(null); // Handle error appropriately
        }
        // fetch Images
        try {
          //const postURL = `${serverHost}:${serverPort}/api/get-images`;
          const postURL = `${serverHost}/api/get-images`;
          const response = await axios.post(
            postURL,
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
            // If response.data is not an empty string
            let tmpExistingImg = [];
            const tmpImages = response.data.map((item) => {
              //const tmpFilePath = `${serverHost}:${serverPort}/${item.file_path}`;
              const tmpFilePath = `${serverHost}/${item.file_path}`;
              tmpExistingImg.push(item.imageId);
              return { src: tmpFilePath }; // Return both fields
            });
            console.log(`setting FbImages`, tmpImages);
            console.log(`setting existing Image Id`, tmpExistingImg);
            setFbImages(tmpImages); // Handle error appropriately
            setExistingImgId(tmpExistingImg);
          }
        } catch (error) {
          console.error("Error fetching Image data:", error);
          setFbImages([]); // Handle error appropriately
        }
      } else {
        // Handle the case where job_id is null or undefined
        console.warn("No job_id provided.");
        setJobData(null); // Or set to a default empty object if appropriate
      }
    };
    fetchData();
  }, [job_id]);

  // assign the JobData into different original parameter

  useEffect(() => {
    console.log(`******useEffect entered`);
    console.log(`FbDetail -> jobData received`, jobData);
    if (jobData) {
      console.log(`******useEffect set jobData entered`);
      // logic to check Token Expiry to force re-login facebook through removing email
      if (jobData.tokenStatus === "Active") {
        setEmail(jobData.email);
        setLogin(true);
      } else {
        setEmail("");
        setLogin(false);
      } // Use default values to avoid undefined

      // Convert the 'from' and 'to' dates to Date objects if they exist
      setSelectFrom(jobData.select_from || "");
      setSelectTo(jobData.select_to || "");

      setfreqOption(jobData.freq_option || "");
      setXminute(jobData.X_minute || "");
      setXhour(jobData.X_hour || "");
      setYminute(jobData.Y_minute || 0);
      setPostText(jobData.post_text || "");
      setSelectedPageID(jobData.page_id || "");
      jobData.job_status === 1 ? setIsChecked(true) : setIsChecked(false);
      setLogin(true);
    }
    setLoading(false);
  }, [jobData, isChecked]);

  function LoginText({ email }) {
    // Capitalize and make it a component
    console.log(`FbDetail -> LoginText : email ${email}`);
    if (email) {
      return <p className="text-sm"> logged in as {email} </p>;
    } else {
      /*if (jobData.tokenStatus === "Active")
        return (
          <p className="text-sm text-red font-bold">
            Token Expired, please RE-login
          </p>
        );
      else */ return null; // Return null when not logged in
    }
  }

  return (
    <div className="w-full">
      <NavbarDetail title="Post Detail" jobId={job_id} />
      {isLoading ? (
        <div>Loading job data...</div>
      ) : (
        // Use a separate conditional check here
        //jobData && (
        <div className="flex gap-1" style={{ height: "620px" }}>
          {console.log(`**********job Data loading finished**********`)}
          {console.log(
            `render FbDetail: email ${email} Yminute ${Yminute} freqOption ${freqOption}`
          )}
          <div className="w-2/6 pt-1 pb-1">
            <div className="section h-1/2">
              <div className="sectionHeader">Job Status</div>
              <div className="p-2 grid grid-cols-5 gap-1">
                <div></div>
                <div className="text-right">Inactive</div>
                <div className="text-center flex justify-center pl-1">
                  <ActiveStatusButton
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                </div>
                <div className="text-left">Active</div>
                <div></div>
              </div>
              <div className="sectionHeader">Facebook Information</div>
              <div className="p-1">
                <FacebookLoginButton
                  email={jobData}
                  setEmail={setEmail}
                  loggedIn={loggedIn}
                  setLogin={setLogin}
                />
              </div>
              <div>
                <div className="text-center">
                  <LoginText email={email} />
                </div>
                <div className="p-2">
                  <FacebookGetPages
                    email={email}
                    loggedIn={loggedIn}
                    selectedPageID={selectedPageID}
                    setSelectedPageID={setSelectedPageID}
                    setSelectedPageToken={setSelectedPageToken}
                  />
                </div>
              </div>
            </div>
            <div className="section h-1/2">
              <div className="sectionHeader">Frequency Information</div>
              <div className="p-1">
                {/* below table is From / To date picker*/}
                <DateFromTo
                  selectFrom={selectFrom}
                  setSelectFrom={setSelectFrom}
                  selectTo={selectTo}
                  setSelectTo={setSelectTo}
                />
                {/*console.log("select from", selectFrom, "select To", selectTo); */}
              </div>
              {/* radio button */}
              <div>
                <ChooseFrequency
                  freqOption={freqOption}
                  setfreqOption={setfreqOption}
                />
                {/*console.log("Chosen Option", freqOption)*/}
                <OptionDetail
                  freqOption={freqOption}
                  Xminute={Xminute}
                  setXminute={setXminute}
                  Yminute={Yminute}
                  setYminute={setYminute}
                  Xhour={Xhour}
                  setXhour={setXhour}
                />
              </div>
            </div>
          </div>
          <div className="w-4/6 pt-1 pb-1">
            <div className="section h-1/3 flex-col justify-stretch">
              <div className="sectionHeader h-8">Post Text</div>
              <div className="">
                <PostText postText={postText} setPostText={setPostText} />
              </div>
            </div>
            <div className="section h-2/3" style={{ overflowY: "scroll" }}>
              <div className="sectionHeader">Post Image</div>
              <div>
                <UploadImage
                  fbImages={fbImages}
                  setFbImages={setFbImages}
                  existingImgId={existingImgId}
                  setExistingImgId={setExistingImgId}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center">
        <button
          className="my-facebook-button"
          onClick={async () => {
            console.log("before SaveToSchdule email", email);
            const errorCode = await SaveToSchedule(
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
              job_id,
              isChecked
            );
            console.log("SaveToSchedule Reply", errorCode);
            if (errorCode === 200) {
              navigate("/FbSummary");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default FbDetail;
