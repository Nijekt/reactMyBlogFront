import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import styles from "./Post.module.scss";
import viewsCountImg from "../../assets/viewsCount.svg";
import commentsCount from "../../assets/commentsCount.svg";

const Post = ({
  title,
  text,
  tags,
  viewsCount,
  createdAt,
  imageUrl,
  id,
  isEditable,
  user,
}) => {
  // console.log("ID", id);
  return (
    <div className={(classnames(isEditable ? "block" : ""), styles.post)}>
      {imageUrl == "http://localhost:4444" ? (
        ""
      ) : (
        <img src={imageUrl} alt="image" />
      )}
      <div className={styles.post__info}>
        <h4>{user.fullName}</h4>
        <h6 className={classnames(styles.date, styles.color)}>{createdAt}</h6>

        <Link to={`/posts/${id}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>

        <h6 className={classnames(styles.color, styles.tags)}>
          {tags.map((obj) => (
            <>{obj ? "#" + obj : []} </>
          ))}
        </h6>
        <div className={styles.counters}>
          <span>
            <img src={viewsCountImg} alt="" className={styles.icon} />
            <span className={styles.nums}> {viewsCount}</span>
          </span>
          <span>
            <img src={commentsCount} alt="" className={styles.icon} />
            <span className={styles.nums}> {0}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
