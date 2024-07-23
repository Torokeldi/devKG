import React from "react";
import '../../pages/DevForms/DevForms.css';
import axios from "axios";
import Cookies from "js-cookie";

interface LoginFormProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const loginApi = "http://3.38.98.134/auth/login";

const LoginForm: React.FC<LoginFormProps> = ({ username, setUsername, password, setPassword }) => {

  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          const response = await axios.post(loginApi, {
              userName: username,
              password: password,
          });
          if (response.data.success) {
              Cookies.set("token", response.data.token, { expires: 7 });
              alert(response.data.message);
          } else {
              alert("Не удалось авторизоваться: " + response.data.message);
          }
      } catch (error: any) {
          console.error("Error during login:", error);
          if (error.response) {
              console.error("Response data:", error.response.data);
              console.error("Response status:", error.response.status);
              console.error("Response headers:", error.response.headers);
              alert("Ошибка сервера: " + error.response.data.message);
          } else if (error.request) {
              console.error("Request data:", error.request);
              alert("Нет ответа от сервера. Пожалуйста, попробуйте позже.");
          } else {
              console.error("Error message:", error.message);
              alert("Ошибка при настройке запроса: " + error.message);
          }
      }
  };
  return (
    <div className="login-content">
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
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Вход</button>
      </form>
    </div>
  );
};

export default LoginForm;
