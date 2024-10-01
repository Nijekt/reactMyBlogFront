import React, { useEffect } from "react";
import styles from "./CommentsBlock.module.scss";
import { useSelector } from "react-redux";

const CommentsBlock = () => {
  const { items, status } = useSelector((state) => state.comments);

  return (
    <div className={styles.comments__block}>
      {status == "loading"
        ? ""
        : items.map((com) => (
            <div key={com._id} className={styles.comment}>
              <div className={styles.user__img} />
              <div className={styles.comment__info}>
                <div className="user__fullName">{com.user?.fullName}</div>
                {com.text}
              </div>
            </div>
          ))}
    </div>
  );
};

export default CommentsBlock;
