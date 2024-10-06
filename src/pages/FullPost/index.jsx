import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./FullPost.module.scss";
import viewsCountImg from "../../assets/viewsCount.svg";
import commentsCountImg from "../../assets/commentsCount.svg";
import classNames from "classnames";
import CommentsBlock from "../../components/CommentsBlock/index.jsx";
import AddComment from "../../components/AddComment/index.jsx";
import { fetchComments } from "../../redux/slices/commentsSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        console.log("DATA", data);
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
            <article className={styles.post__description}>
              {/* <h3>{data.user.fullName}</h3> */}
              <h3>
                {" "}
                <Link to={`/user/${data.user._id}`}>{data.user.fullName}</Link>
              </h3>
              <h6>{data.createdAt}</h6>
              <h1 className={styles.title}>{data.title}</h1>
              <h6 className={styles.tags}>
                #{data.tags ? data.tags.join(" #") : ""}
              </h6>
              <h2 className={styles.text}>
                <Markdown remarkPlugins={[remarkGfm]}>{data.text}</Markdown>
              </h2>
              <div className={styles.counters}>
                <span>
                  <img src={viewsCountImg} alt="" className={styles.icon} />
                  <span className={styles.nums}> {data.viewsCount}</span>
                </span>
                <span>
                  <img src={commentsCountImg} alt="" className={styles.icon} />
                  <span className={styles.nums}> {data.commentsCount}</span>
                </span>
              </div>
            </article>
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
