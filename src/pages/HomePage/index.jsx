import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../../redux/slices/postsSlice";
import Post from "../../components/Post";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts.items);
  const tags = useSelector((state) => state.posts.tags.items);
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

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
              createdAt={obj.createdAt}
              user={obj.user}
              imageUrl={`http://localhost:4444${obj.imageUrl}`}
              isEditable
            />
          ))}
        </main>
        <aside className={styles.sidebar}>
          <article className={styles.tags}>
            <h2>Tags</h2>
            <ul className={styles.tags__list}>
              {tags.map((obj) => (
                <li className="tags-list__item">{obj}</li>
              ))}
            </ul>
          </article>

          <article className={styles.comments}>
            <h2>Comments</h2>
            <ul className={styles.comments__list}>
              <li>Com</li>
              <li>Com</li>
              <li>Com</li>
              <li>Com</li>
            </ul>
          </article>
        </aside>
      </div>
    </>
  );
};

export default HomePage;
