import { useEffect } from "react";
import { SetDefaultDate } from "../utilities/DateOp";

export function DateFromTo({
  selectFrom,
  setSelectFrom,
  selectTo,
  setSelectTo,
}) {
  console.log(`DateFromTo rendered`, selectFrom, selectTo, typeof selectFrom);
  useEffect(() => {
    console.log(`useEffect DateFromTo entered`, selectFrom, selectTo);
    SetDefaultDate(setSelectFrom, selectFrom, 0);
    SetDefaultDate(setSelectTo, selectTo, 7);
  }, [setSelectFrom, setSelectTo, selectFrom, selectTo]); // Empty dependency array ensures this runs only once on mount

  const handleDateToChange = (event) => {
    if (event.target.value > selectFrom) {
      setSelectTo(event.target.value);
    } else {
      setSelectTo("");
      alert("ERROR: To Date is earlier than From Date");
    }
  };

  return (
    <div className="p-1">
      {/* below table is From / To date picker*/}
      <table className="border p-2 w-full">
        <thead></thead>
        <tbody className="w-full text-sm">
          <tr className="border p-1 defaultfontsize w-full">
            <td className="border p-1">From</td>
            <td className="border pl-1 pt-1 pb-1">
              <input
                type="date"
                id="1"
                name="Select From"
                value={selectFrom}
                onChange={(e) => {
                  setSelectFrom(e.target.value);
                }}
                className="border-2 border-blue-100"
              />
            </td>
          </tr>
          <tr className="border p-1 defaultfontsize w-full">
            <td className="border p-1">To</td>
            <td className="border p-1">
              <input
                type="date"
                id="1"
                name="Select To"
                value={selectTo}
                onChange={handleDateToChange}
                className="border-2 border-blue-100"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
