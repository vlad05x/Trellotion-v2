import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/action";
import { useNavigate } from "react-router-dom";
import "./AuthForm.scss";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(login(formData));
    if (success) {
      navigate("/boards");
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-form__container">
        <h2 className="auth-form__title">Welcome back!</h2>
        <p className="auth-form__subtitle">
          Don’t have an account?{" "}
          <a href="/register" className="auth-form__link">
            Sign up
          </a>
        </p>
        <form className="auth-form__body" onSubmit={handleSubmit}>
          <div className="auth-form__input-group">
            <input
              type="email"
              name="email"
              className="auth-form__input"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-form__input-group">
            <input
              type="password"
              name="password"
              className="auth-form__input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-form__button">
            Sign in
          </button>
          {error && <p className="auth-form__error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
