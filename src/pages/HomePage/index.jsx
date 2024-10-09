import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  fetchPostsByViews,
  fetchTags,
} from "../../redux/slices/postsSlice";
import Post from "../../components/Post";
import styles from "./HomePage.module.scss";
import { fetchLastComments } from "../../redux/slices/commentsSlice";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import SideBar from "../../components/SideBar";

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { items: posts, status } = useSelector((state) => state.posts.posts);
  const { items: tags, status: tagsStatus } = useSelector(
    (state) => state.posts.tags
  );
  const lastComs = useSelector((state) => state.comments.lastComs.items);
  const getAuth = useSelector((state) => state.auth.data);
  const { tag } = queryString.parse(location.search);
  const [sortType, setSortType] = useState("latest");
  useEffect(() => {
    if (sortType === "latest") {
      dispatch(fetchPosts(tag));
    } else if (sortType === "popularest") {
      dispatch(fetchPostsByViews(tag));
    }

    dispatch(fetchTags());
    dispatch(fetchLastComments());
  }, [tag, sortType, dispatch]);

  const handleSelectTag = useCallback(
    (selectedTag) => {
      if (tag === selectedTag) {
        navigate("/home");
      } else {
        navigate(`/home?tag=${selectedTag}`);
      }
    },
    [tag]
  );

  const handleSortByLatest = () => {
    setSortType("latest");
  };
  const handleSortByViews = () => {
    setSortType("popularest");
  };
  console.log("STATUS", status);

  const isPostsLoading = status == "loading";

  console.log(isPostsLoading);

  console.log("Last", lastComs);
  console.log("get AU", getAuth);
  return (
    <>
      <div className={styles.filter}>
        <button
          onClick={handleSortByLatest}
          className={classNames(sortType == "latest" ? styles.active : "")}
        >
          Latest
        </button>
        <button
          onClick={handleSortByViews}
          className={classNames(sortType == "popularest" ? styles.active : "")}
        >
          Popularest
        </button>
      </div>
      <div className={styles.wrapper}>
        <main>
          {isPostsLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <Post key={index} isLoading={true} />
              ))
            : posts.map((obj) => (
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
                  isLoading={false}
                />
              ))}
        </main>
        <aside className={styles.sidebar}>
          <SideBar
            tags={tags}
            lastComs={lastComs}
            handleSelectTag={handleSelectTag}
            tag={tag}
          />
        </aside>
      </div>
    </>
  );
};

export default HomePage;
