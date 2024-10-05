import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../../redux/slices/postsSlice";
import Post from "../../components/Post";
import styles from "./HomePage.module.scss";
import { fetchLastComments } from "../../redux/slices/commentsSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts.items);
  const tags = useSelector((state) => state.posts.tags.items);
  const lastComs = useSelector((state) => state.comments.lastComs.items);
  const getAuth = useSelector((state) => state.auth.data);
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchLastComments());
  }, []);

  console.log("Last", lastComs);
  console.log("get AU", getAuth);
  return (
    <>
      <h1>Hello kвфвыitty</h1>
      <div className={styles.wrapper}>
        <main>
          {posts.map((obj) => (
            <Post
              key={obj._id}
              id={obj._id}
              title={obj.title}
              text={obj.text}
              tags={obj.tags}
              viewsCount={obj.viewsCount}
              commentsCount={obj.commentsCount}
              createdAt={obj.createdAt}
              user={obj.user}
              imageUrl={`http://localhost:4444${obj.imageUrl}`}
              isEditable={getAuth?._id === obj?.user._id}
            />
          ))}
        </main>
        <aside className={styles.sidebar}>
          <article className={styles.tags}>
            <h2>Tags</h2>
            <ul className={styles.tags__list}>
              {tags.map((obj, index) => (
                <li key={index} className="tags-list__item">
                  {obj}
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
        </aside>
      </div>
    </>
  );
};

export default HomePage;
