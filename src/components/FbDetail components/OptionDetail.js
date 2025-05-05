//import { useEffect } from "react";

import config from "../../config.js"; // Adjust path as needed

export default function OptionDetail({
  freqOption,
  Xminute,
  setXminute,
  Yminute,
  setYminute,
  Xhour,
  setXhour,
}) {
  console.log(`render OptionDetail Yminute is ${Yminute}`);
  let content;

  /*useEffect(() => {
    setXminute(config.defaultValue);
    console.log(`default value set as`, config.default);
  }, []);*/

  const handleXMinuteChange = (event) => {
    setXminute(event.target.value);
    console.log(`Option selected:`, Xminute);
  };

  const handleXhourChange = (event) => {
    if (event.target.value < 1 || event.target.value > 23) {
      alert(`Please input valid hour`);
      return;
    }
    setXhour(event.target.value);
    console.log(`Xhour is :`, Xhour);
  };

  const handleYMinuteChange = (event) => {
    if (event.target.value < 0 || event.target.value > 59) {
      alert(`Please input valid minute`);
      return;
    }
    setYminute(event.target.value);
    console.log(`YMmnute is`, Yminute);
  };

  console.log(`freq Option received in OptionDetail`, freqOption);
  if (freqOption === 1 || freqOption === "1") {
    console.log(`Entered freqOption=1`, freqOption);
    content = (
      <>
        <table className="border p-1 w-full">
          <thead></thead>
          <tbody className="text-sm">
            <tr className="border p-1 defaultfontsize w-full flex">
              <td className="border p-1 flex-1">X Minute</td>
              <td className="border p-1 flex-1">
                <select
                  id="module-dropdown"
                  value={Xminute}
                  onChange={handleXMinuteChange}
                  className="border-2 border-blue-100"
                >
                  {config.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  } else {
    console.log(`Entered freqOption=2`, freqOption);
    content = (
      <>
        <table className="border p-1 w-full">
          <thead></thead>
          <tbody className="w-full text-sm">
            <tr className="border p-1 defaultfontsize w-full">
              <td className="border p-1">X hour</td>
              <td className="border p-1">
                <input
                  type="Text"
                  id="1"
                  name="X hour"
                  value={Xhour}
                  onChange={handleXhourChange}
                  className="border-2 border-blue-100"
                />
              </td>
            </tr>
            <tr className="border p-1 defaultfontsize w-full">
              <td className="border p-1">At Y minute</td>
              <td className="border p-1">
                <input
                  type="Text"
                  id="1"
                  name="Y Minute"
                  value={Yminute}
                  onChange={handleYMinuteChange}
                  className="border-2 border-blue-100"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
  return <div className="p-1">{content}</div>;
}
