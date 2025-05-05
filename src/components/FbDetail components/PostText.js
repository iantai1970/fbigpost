const PostText = ({ postText, setPostText }) => {
  return (
    <div className="text-sm w-full border">
      <textarea
        id="textarea"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="Type your post here..."
        className="mt-1 w-full h-36"
      />
    </div>
  );
};

export default PostText;
