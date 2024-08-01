// LoginForm.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import "../../pages/DevForms/DevForms.css";

interface LoginFormProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const loginApi = "http://3.38.98.134/auth/login";

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  setLoginStatus,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
      navigate("/JobOpenings");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
    try {
      const response = await axios.post(loginApi, {
        userName: username,
        password: password,
      });
      if (response.data.success) {
        Cookies.set("token", response.data.token, { expires: 7 });
        setLoginStatus(true);
        alert(response.data.message);
        navigate("/JobOpenings");
      } else {
        alert("Не удалось авторизоваться: " + response.data.message);
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      if (error.response) {
        alert("Ошибка сервера: " + error.response.data.message);
      } else if (error.request) {
        alert("Нет ответа от сервера. Пожалуйста, попробуйте позже.");
      } else {
        alert("Ошибка при настройке запроса: " + error.message);
      }
    }
  };

  return (
    <div className="login-content">
      {isLoggedIn ? (
        <p>Вы уже авторизованы. Перенаправление...</p>
      ) : (
        <>
          <h2>Авторизация</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="login-username">Имя пользователя:</label>
              <input
                type="text"
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="login-password">Пароль:</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEye /> : <AiOutlineEye />}
                </button>
              </div>
            </div>
            <button type="submit">Вход</button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;
