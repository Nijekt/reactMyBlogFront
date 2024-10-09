import { useEffect, useState } from "react";
import { fetchAuth, isAuthSelector } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    console.log(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({
      email: "",
      password: "",
    });
    const data = await dispatch(fetchAuth(formValues));

    if (data.payload?.errors) {
      const errors = {};
      data.payload.errors.forEach((error) => {
        errors[error.path] = error.msg;
      });
      setFormErrors(errors);
      return;
    }
    console.log(data);

    if (!data.payload) {
      return console.log("Cant auth");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  console.log(formErrors);
  console.log("IS AUTH", isAuth);

  if (isAuth) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.input__wrapper}>
            <input
              placeholder="Email"
              type="text"
              name="email"
              id="email"
              value={formValues.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <span className={styles.error__message}>{formErrors.email}</span>
            )}{" "}
          </div>

          <div className={styles.input__wrapper}>
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
            />
            {formErrors.password && (
              <span className={styles.error__message}>
                {formErrors.password}
              </span>
            )}{" "}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
