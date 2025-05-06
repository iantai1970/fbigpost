import { useState, useEffect } from "react";
import axios from "axios";

const serverHost = process.env.REACT_APP_API_URL;
const serverPort = process.env.REACT_APP_API_PORT;

async function getPages({ email, setPages }) {
  console.log("FbGetPages->getPages: User has logged in", email);
  //const postURL = `${serverHost}:${serverPort}/api/facebook-get-pages`;
  const postURL = `${serverHost}/api/facebook-get-pages`;
  try {
    const serverResponse = await axios.post(
      postURL,
      {
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = serverResponse.data;

    if (serverResponse.status === 200) {
      console.log("FbGetPages->Get Pages Server response:", data);
      //alert("Got Pages successfully!");
      console.log("FbGetPages->Data got", data);
      const updatedPages = data.map((page) => {
        return {
          ...page,
          checked: false, // Initialize all to false
        };
      });
      setPages(updatedPages);
    } else {
      console.error("FbGetPages->Server error:", data);
      alert("Cannot Get Pages: " + data.error);
    }
  } catch (error) {
    console.error("FbGetPages->Network error:", error);
    alert("Cannot Get Pages: Network error");
  }
}

function FacebookGetPages({
  email,
  loggedIn,
  selectedPageID,
  setSelectedPageID,
  setSelectedPageToken,
}) {
  const [pages, setPages] = useState([]);
  console.log(`FacebookGetPages awake`, loggedIn);

  const handleCheckboxChange = (id) => {
    const updatedPages = pages.map((item) => {
      if (item.id === id) {
        setSelectedPageID(item.id);
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setPages(updatedPages);
  };

  useEffect(() => {
    if (loggedIn && email) {
      console.log("FbGetPages : User has logged in", email);
      getPages({ email: email, setPages: setPages });
    }
  }, [email, loggedIn]);

  useEffect(() => {
    // Set the first item's checked property to true on component mount, if none are checked
    if (pages.length > 0 && !pages.some((item) => item.checked)) {
      const updatedPages = [...pages];
      updatedPages[0] = { ...updatedPages[0], checked: true };
      setSelectedPageID(updatedPages[0].id);
      setSelectedPageToken(updatedPages[0].pageToken);
      setPages(updatedPages);
    }
  }, [pages, setSelectedPageID, setPages, setSelectedPageToken]); // Added setSelectedPageID and setPages to dependencies

  return (
    <div>
      <table className="border p-1 w-full">
        <thead>
          <tr className="border p-1 bg-blue-200 text-gray-700 defaultfontsize">
            <th className="border p-1">Page Name</th>
            <th className="border p-1">Select</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {pages.map((item) => (
            <TableRow
              key={item.id}
              item={item}
              onChange={handleCheckboxChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ item, onChange }) {
  return (
    <tr className="border p-1 defaultfontsize w-full">
      <td className="border p-1">{item.name}</td>
      <td className="border p-1">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onChange(item.id)}
        />
      </td>
    </tr>
  );
}

export default FacebookGetPages;
