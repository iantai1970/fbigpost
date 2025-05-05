export default function ActiveStatusButton({ isChecked, setIsChecked }) {
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    console.log(`isChecked ${isChecked}`);
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`box block h-7 w-12 rounded-full ${
              isChecked ? "bg-blue-500" : "bg-dark-4"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white transition ${
              isChecked ? "translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </>
  );
}
