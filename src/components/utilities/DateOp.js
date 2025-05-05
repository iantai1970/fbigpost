export function SetDefaultDate(setSelectedDate, selectDate) {
  // Function to format the date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Set the default value to today's date
  if (!selectDate) {
    const today = new Date();
    setSelectedDate(formatDate(today));
  } else {
    setSelectedDate(selectDate);
  }
  return null;
}

export function convertDateFormat(dbDateString) {
  // 1. Create a Date object from the DB date string.  The 'Z' indicates UTC time.
  const dbDate = new Date(dbDateString);

  // 2. Convert to the desired format using toLocaleString() with options.
  const options = {
    weekday: "short", // "Sat"
    month: "short", // "Apr"
    day: "numeric", // "19"
    year: "numeric", // "2025"
    hour: "2-digit", // "22"
    minute: "2-digit", // "32"
    second: "2-digit", // "42"
    timeZoneName: "long", // "Hong Kong Standard Time"
  };

  return dbDate.toLocaleString("en-US", options);
}

export function constructToDate(dateString) {
  const date = new Date(dateString);
  date.setHours(23, 59, 59, 0); // Set the time to 23:59:59.000

  return date.toISOString().slice(0, 19).replace("T", " "); // Format the timestamp
}
