import { useState } from "react";
import { fetchRegister, isAuthSelector } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    fullName: "Nikita Snizko",
    email: "ns@gmail.com",
    password: "123123",
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
      alert("Can not register account");
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
    <div>
      <h1>Create Acc</h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formValues.fullName}
            onChange={handleChange}
          />
          {formErrors.fullName && <span>{formErrors.fullName}</span>}{" "}
        </div>
        <div>
          <input
            type="text"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email && <span>{formErrors.email}</span>}{" "}
        </div>

        <div>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
          />
          {formErrors.password && <span>{formErrors.password}</span>}{" "}
        </div>
        <button type="submit">Sub</button>
      </form>
    </div>
  );
};

export default Register;
