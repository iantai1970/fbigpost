export default function ChooseMedia({ mediaOption, setMediaOption }) {
  return (
    <div>
      <div className="mt-1 mb-1">
        <label className="text-sm pl-2 pr-3">
          <input
            type="radio"
            value="1"
            checked={mediaOption === 1 || mediaOption === "1"}
            onChange={(e) => setMediaOption(e.target.value)}
            name="Media Option" // Important: All radios in the group must have the same name
          />
          Image
        </label>
        <label className="text-sm">
          <input
            type="radio"
            value="2"
            checked={mediaOption === 2 || mediaOption === "2"}
            onChange={(e) => setMediaOption(e.target.value)}
            name="Media Option"
          />
          Video
        </label>
      </div>

      <div>
        <hr class="solid"></hr>
      </div>
    </div>
  );
}
