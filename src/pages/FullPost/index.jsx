import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./FullPost.module.scss";
import viewsCountImg from "../../assets/viewsCount.svg";
import commentsCount from "../../assets/commentsCount.svg";
import classNames from "classnames";
import CommentsBlock from "../../components/CommentsBlock/index.jsx";
import AddComment from "../../components/AddComment/index.jsx";
import { fetchComments } from "../../redux/slices/commentsSlice.js";
import { useDispatch } from "react-redux";

const FullPost = () => {
  const [data, setData] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  console.log("ID", id);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`posts/${id}`);
        console.log("Data", data);
        setData(data);
        dispatch(fetchComments(id));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <div className={styles.wrapper}>
      {isLoading || (
        <>
          <section className={classNames(styles.post__info, styles.block)}>
            {data.imageUrl && (
              <img
                className={styles.img__banner}
                src={`http://localhost:4444${data.imageUrl}`}
                alt=""
              />
            )}

            <h3>{data.user.fullName}</h3>
            <h6>{data.createdAt}</h6>
            <h1 className={styles.title}>{data.title}</h1>
            <h6 className={styles.tags}>
              {data.tags ? data.tags.join(",") : ""}
            </h6>
            <h2 className={styles.text}> {data.text}</h2>

            <div className={styles.counters}>
              <span>
                <img src={viewsCountImg} alt="" className={styles.icon} />
                <span className={styles.nums}> {data.viewsCount}</span>
              </span>
              <span>
                <img src={commentsCount} alt="" className={styles.icon} />
                <span className={styles.nums}> {0}</span>
              </span>
            </div>
          </section>
          <br />
          <article className={classNames(styles.comments, styles.block)}>
            <CommentsBlock postId={id} />
            <AddComment />
          </article>
        </>
      )}
    </div>
  );
};

export default FullPost;
