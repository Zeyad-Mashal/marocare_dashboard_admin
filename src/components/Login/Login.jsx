import React, { useState } from "react";
import "./Login.css";
import authLoginApi from "../../api/authLoginApi";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const login = () => {
    const data = {
      email,
      password,
    };
    if (email === "" || password === "") {
      setError("يجب ادخال البيانات الصحيحة");
    } else {
      authLoginApi(data, setError, setloading);
    }
  };
  return (
    <div className="login_container">
      <div className="login_box">
        <h3>اهلا بكم في لوحة تحكم Maro Care</h3>
        <div className="login_inputs">
          <input
            type="text"
            placeholder="قم بإدخال الايميل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="قم بإدخال الباسورد"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submit_btn">
          {error}
          <button type="submit" onClick={login}>
            {loading ? "Loading..." : "تسجيل دخول"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
