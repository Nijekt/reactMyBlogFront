import React, { useRef, useState } from "react";
import axios from "../../axios.js";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../redux/slices/authSlice.js";

const AddPost = () => {
  const isAuth = useSelector(isAuthSelector);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = useRef(null);
  const navigate = useNavigate();

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("upload", formData);
      console.log(data);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImg = () => {
    setImageUrl("");
  };

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        tags: tags.split(","),
        imageUrl,
        text,
      };

      const { data } = await axios.post("posts", fields);

      const id = data._id;

      navigate(`/posts/${id}`);
    } catch (error) {}
  };

  if (!isAuth) {
    return <Navigate to={"/login"} replace={true} />;
    // navigate("/login");
  }

  console.log(isAuth);

  return (
    <div>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl ? (
        <>
          <img src={`http://localhost:4444${imageUrl}`} />
          <button onClick={handleDeleteImg}>Delete Img</button>
        </>
      ) : (
        <button onClick={() => inputFileRef.current.click()}>Add Image</button>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        type="text"
        placeholder="Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={onSubmit}>Add post</button>
    </div>
  );
};

export default AddPost;
