import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, isAuthSelector } from "./redux/slices/authSlice";
import { useEffect } from "react";
import Header from "./components/Header";
import styles from "./App.module.scss";
import AddPost from "./pages/AddPost";
import FullPost from "./pages/FullPost";
import UserPage from "./pages/UserPage";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <div className={styles.app__container}>
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/addpost/:id/edit" element={<AddPost />} />
            <Route path="/posts/:id" element={<FullPost />} />
            <Route path="/user/:id" element={<UserPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
