import React, { memo } from "react";
import styles from "./SideBar.module.scss";
import classNames from "classnames";
const SideBar = memo(({ tags, lastComs, handleSelectTag, tag }) => {
  return (
    <>
      <article className={styles.tags}>
        <h2 style={{ padding: "0 20px" }}>Tags</h2>
        <ul className={styles.tags__list}>
          {tags.map((obj, index) => (
            <li
              key={index}
              className={classNames(
                styles.tags__list__item,
                obj === tag ? styles.tags__list__item__active : ""
              )}
              onClick={() => handleSelectTag(obj)}
              style={{
                cursor: "pointer",
              }}
            >
              <span className={styles.tag}>{obj}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className={styles.comments}>
        <h2>Comments</h2>
        <ul className={styles.comments__list}>
          {lastComs.map((obj, index) => (
            <li key={index} className={styles.comments__list__item}>
              <img
                src={
                  obj.user.avatarUrl
                    ? `http://localhost:4444${obj.user.avatarUrl}`
                    : "https://www.paintgarden.com/cdn/shop/products/B6B4B2.png?v=1658176231&width=533"
                }
                className={styles.user__img}
              />
              <div className="item__wrapper">
                <h5>{obj.user?.fullName}</h5>
                {obj.text}
              </div>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
});

export default SideBar;
