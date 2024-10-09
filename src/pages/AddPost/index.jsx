import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "../../axios.js";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../redux/slices/authSlice.js";
import styles from "./AddPost.module.scss";
import classNames from "classnames";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

const AddPost = () => {
  const isAuth = useSelector(isAuthSelector);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditable = Boolean(id);
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

      const { data } = isEditable
        ? await axios.patch(`posts/${id}`, fields)
        : await axios.post("posts", fields);

      const _id = isEditable ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeText = useCallback((event) => {
    setText(event);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Type text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );
  useEffect(() => {
    if (id) {
      axios
        .get(`posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setTags(data.tags);
          setText(data.text);
          setImageUrl(data.imageUrl);
        })
        .catch((error) => console.warn(error));
    }
  }, []);

  if (!isAuth) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <div className={styles.container}>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl ? (
        <>
          <img
            className={styles.img__banner}
            src={`http://localhost:4444${imageUrl}`}
          />
          <button
            className={classNames(styles.img__button, styles.img__delete)}
            onClick={handleDeleteImg}
          >
            Delete Img
          </button>
        </>
      ) : (
        <button
          className={styles.img__button}
          onClick={() => inputFileRef.current.click()}
        >
          Add Image
        </button>
      )}

      <input
        className={classNames(styles.input, styles.title)}
        type="text"
        placeholder="Title of post..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className={classNames(styles.input, styles.tags)}
        type="text"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={handleChangeText}
        options={options}
      />
      {isEditable ? (
        <button className={styles.button__submit} onClick={onSubmit}>
          Update Post
        </button>
      ) : (
        <button className={styles.button__submit} onClick={onSubmit}>
          Add post
        </button>
      )}
    </div>
  );
};

export default AddPost;
