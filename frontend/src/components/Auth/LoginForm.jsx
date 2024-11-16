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
  const [error, setError] = useState(null); // Состояние для ошибок
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: serverError } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Сбрасываем ошибки при новой попытке

    // Проверка на пустые поля
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Проверка на корректность формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      const success = await dispatch(login(formData));
      if (success) {
        navigate("/boards");
      } else {
        setError(serverError || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
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
          {error && <p className="auth-form__error">{error}</p>}{" "}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
