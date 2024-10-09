import React, { useEffect } from "react";
import styles from "./CommentsBlock.module.scss";
import { useSelector } from "react-redux";

const CommentsBlock = () => {
  const { items, status } = useSelector((state) => state.comments.comments);

  // console.log(items);
  return (
    <div className={styles.comments__block}>
      <h2>Comments</h2>
      {status == "loading"
        ? ""
        : items.map((com) => (
            <div key={com._id} className={styles.comment}>
              {com?.user.avatarUrl ? (
                <img
                  src={`http://localhost:4444${com.user?.avatarUrl}`}
                  className={styles.user__img}
                />
              ) : (
                <img
                  src={
                    "https://www.paintgarden.com/cdn/shop/products/B6B4B2.png?v=1658176231&width=533"
                  }
                  className={styles.user__img}
                />
              )}

              <div className={styles.comment__info}>
                <h4 className="user__fullName">{com.user?.fullName}</h4>
                {com.text}
              </div>
            </div>
          ))}
    </div>
  );
};

export default CommentsBlock;
