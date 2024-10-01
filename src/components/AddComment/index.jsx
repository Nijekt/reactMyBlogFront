import React, { useState } from "react";
import styles from "./AddComment.module.scss";
import axios from "../../axios.js";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchComments } from "../../redux/slices/commentsSlice.js";
const AddComment = () => {
  const [text, setText] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();

  console.log(id);

  const onSubmit = async () => {
    try {
      const { data } = await axios.post(`comments/${id}`, { text });
      dispatch(fetchComments(id));
      setText("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(text);
  return (
    <div className={styles.form}>
      <input
        type="text"
        className="comment__input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={onSubmit}>Send</button>
    </div>
  );
};

export default AddComment;
