import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserPage.module.scss";
import Post from "../../components/Post";
import axios from "../../axios.js";
import plusImg from "../../assets/plus.svg";
import UserPageSkeleton from "./UserPageSkeleton.jsx";
import PostSkeleton from "../../components/Post/PostSkeleton.jsx";
const UserPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: user, status } = useSelector((state) => state.user);
  const authData = useSelector((state) => state.auth.data);
  const getAuth = useSelector((state) => state.auth.data);
  const inputFileReF = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [id]);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("upload", formData);
      setImageUrl(data.url);

      await axios.patch(`user/${id}/avatar`, { avatarUrl: data.url });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") {
    return (
      <div className={styles.skeleton}>
        <UserPageSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <div className={styles.user__avatar}>
          {" "}
          <img
            src={
              imageUrl || user.userData.avatarUrl
                ? `http://localhost:4444${imageUrl || user.userData.avatarUrl}`
                : "https://www.paintgarden.com/cdn/shop/products/B6B4B2.png?v=1658176231&width=533"
            }
            onClick={
              user.userData._id === authData?._id
                ? () => inputFileReF.current.click()
                : () => alert("This is not your acc")
            }
          />{" "}
          <div className={styles.avatar__change} />
        </div>

        <input
          ref={inputFileReF}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
        <div className={styles.user__info}>
          <h2 className={styles.fullName}>{user.userData.fullName}</h2>
          <div className={styles.email}>{user.userData.email}</div>
          <div className={styles.email}>{user.userData.createdAt}</div>
        </div>
      </div>
      <div className={styles.post}>
        {user.posts.map((obj) => (
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
            isEditable={getAuth?._id === obj.user._id}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
