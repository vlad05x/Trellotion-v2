import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../store/action";
import { useNavigate } from "react-router-dom";
import "./AuthForm.scss";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(register(formData));
    if (success) {
      navigate("/boards");
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-form__container">
        <h2 className="auth-form__title">Create your account</h2>
        <p className="auth-form__subtitle">
          Already have an account?{" "}
          <a href="/" className="auth-form__link">
            Log in
          </a>
        </p>
        <form className="auth-form__body" onSubmit={handleSubmit}>
          <div className="auth-form__input-group">
            <input
              type="text"
              name="username"
              className="auth-form__input"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-form__input-group">
            <input
              type="email"
              name="email"
              className="auth-form__input"
              placeholder="Email"
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
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
