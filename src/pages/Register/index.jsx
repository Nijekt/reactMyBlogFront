import { useState } from "react";
import { fetchRegister, isAuthSelector } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";

const Register = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    fullName: "",
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
      fullName: "",
      email: "",
      password: "",
    });
    const data = await dispatch(fetchRegister(formValues));

    if (data.payload.errors) {
      const errors = {};
      data.payload.errors.forEach((error) => {
        errors[error.path] = error.msg;
      });
      setFormErrors(errors);
      return;
    }
    console.log(data);
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("This email is already registered");
    }

    if (!data.payload) {
      return console.log("Cant auth");
    }
  };
  console.log(formErrors);
  console.log(isAuth);

  if (isAuth) {
    navigate("/login");
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.input__wrapper}>
            <input
              placeholder="FullName"
              type="text"
              name="fullName"
              id="fullName"
              value={formValues.fullName}
              onChange={handleChange}
            />
            {formErrors.fullName && (
              <span className={styles.error__message}>
                {formErrors.fullName}
              </span>
            )}{" "}
          </div>
          <div className={styles.input__wrapper}>
            <input
              placeholder="Emai"
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
