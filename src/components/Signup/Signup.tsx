// SignupForm.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import "../../pages/DevForms/DevForms.css";

interface SignupFormProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setRegistrationStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const signupApi = "http://3.38.98.134/auth/signup";

const SignupForm: React.FC<SignupFormProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  email,
  setEmail,
  setRegistrationStatus,
}) => {
  const [message, setMessage] = useState("");
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !email) {
      setMessage("Пожалуйста, заполните все поля.");
      return;
    }
    try {
      const response = await axios.post(signupApi, {
        userName: username,
        password: password,
        email: email,
      });
      if (response.data.success) {
        Cookies.set("token", response.data.token, { expires: 7 });
        setMessage(response.data.message);
        setRegistrationStatus(true);
        navigate("/JobOpenings");
      } else {
        setMessage("Не удалось зарегистрироваться: " + response.data.message);
      }
    } catch (error: any) {
      console.error("Error during signup:", error);
      if (error.response) {
        setMessage("Ошибка сервера: " + error.response.data.message);
      } else if (error.request) {
        setMessage("Нет ответа от сервера. Пожалуйста, попробуйте позже.");
      } else {
        setMessage("Ошибка при настройке запроса: " + error.message);
      }
    }
  };

  return (
    <div className="signup-content">
      {isLoggedIn ? (
        <p>Вы уже зарегистрированы. Перенаправление...</p>
      ) : (
        <>
          <h2>Регистрация</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleSignup}>
            <div>
              <label htmlFor="signup-username">Имя пользователя:</label>
              <input
                type="text"
                id="signup-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="signup-email">Электронная почта:</label>
              <input
                type="email"
                id="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="signup-password">Пароль:</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="signup-password"
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
            <button type="submit">Регистрация</button>
          </form>
        </>
      )}
    </div>
  );
};

export default SignupForm;
