import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import styles from "./Post.module.scss";
import viewsCountImg from "../../assets/viewsCount.svg";
import commentsCountImg from "../../assets/commentsCount.svg";
import crossImg from "../../assets/cross.svg";
import editImg from "../../assets/edit.svg";
import { removePost } from "../../redux/slices/postsSlice";
import { useDispatch } from "react-redux";

const Post = ({
  title,
  text,
  tags,
  viewsCount,
  commentsCount,
  createdAt,
  imageUrl,
  id,
  isEditable,
  user,
}) => {
  const dispatch = useDispatch();
  const handleRemovePost = () => {
    dispatch(removePost(id));
  };

  return (
    <div className={styles.post}>
      {isEditable && (
        <div className={styles.post__edit}>
          <span>
            <Link to={`/addpost/${id}/edit`}>
              <img className={styles.icon} src={editImg} alt="" />
            </Link>
          </span>
          <span onClick={handleRemovePost}>
            <img className={styles.icon} src={crossImg} alt="" />
          </span>
        </div>
      )}

      {imageUrl == "http://localhost:4444" ? (
        ""
      ) : (
        <img src={imageUrl} alt="image" />
      )}
      <div className={styles.post__info}>
        <div className={styles.img__wrapper}>
          <img
            src={
              user.avatarUrl
                ? `http://localhost:4444${user.avatarUrl}`
                : "https://www.paintgarden.com/cdn/shop/products/B6B4B2.png?v=1658176231&width=533"
            }
            className={styles.user__img}
          />
        </div>
        <div className={styles.post__wrapper}>
          <h4>
            <Link to={`/user/${user._id}`}>{user.fullName}</Link>
          </h4>
          <h6 className={classnames(styles.date, styles.color)}>{createdAt}</h6>

          <Link to={`/posts/${id}`}>
            <h2 className={styles.title}>{title}</h2>
          </Link>

          <h6 className={classnames(styles.color, styles.tags)}>
            {tags.map((obj, index) => (
              <span key={index}>{obj ? "#" + obj : []} </span>
            ))}
          </h6>
          <div className={styles.counters}>
            <span>
              <img src={viewsCountImg} alt="" className={styles.icon} />
              <span className={styles.nums}> {viewsCount}</span>
            </span>
            <span>
              <img src={commentsCountImg} alt="" className={styles.icon} />
              <span className={styles.nums}> {commentsCount}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
