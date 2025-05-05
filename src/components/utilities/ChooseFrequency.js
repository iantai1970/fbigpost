export default function ChooseFrequency({ freqOption, setfreqOption }) {
  return (
    <div>
      <label className="text-sm pl-2 pr-3">
        <input
          type="radio"
          value="1"
          checked={freqOption === 1 || freqOption === "1"}
          onChange={(e) => setfreqOption(e.target.value)}
          name="Frequency Option" // Important: All radios in the group must have the same name
        />
        Every X mins
      </label>
      <label className="text-sm">
        <input
          type="radio"
          value="2"
          checked={freqOption === 2 || freqOption === "2"}
          onChange={(e) => setfreqOption(e.target.value)}
          name="Frequency Option"
        />
        Every X hr at Y min
      </label>
    </div>
  );
}
