import React from "react";
import styles from "./Header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthSelector, logout } from "../../redux/slices/authSlice";

const Header = () => {
  const isAuth = useSelector(isAuthSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <NavLink to={"/home"}>
            <div className={styles.logo}>My-Blog</div>
          </NavLink>

          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <NavLink to={"/addpost"}>
                  <button className={styles.button}>Write post</button>
                </NavLink>{" "}
                <button
                  className={styles.button}
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to={"/login"}>
                  <button className={styles.button}>Login</button>{" "}
                </NavLink>
                <NavLink to={"/"}>
                  <button className={styles.button}>Register</button>
                </NavLink>
              </>
            )}
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
