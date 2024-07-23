import React from "react";
import '../../pages/DevForms/DevForms.css';
import axios from "axios";
import Cookies from "js-cookie";

interface SignupFormProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const loginApi = "http://3.38.98.134/auth/login";

const SignupForm: React.FC<SignupFormProps> = ({ username, setUsername, password, setPassword, email, setEmail }) => {

  const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          const response = await axios.post(loginApi, {
              userName: username,
              password: password,
              email: email,
          });
          if (response.data.success) {
              Cookies.set("token", response.data.token, { expires: 7 });
              alert(response.data.message);
          } else {
              alert("Не удалось зарегистрироваться: " + response.data.message);
          }
      } catch (error: any) {
          console.error("Error during signup:", error);
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
    <div className="signup-content">
      <h2>Регистрация</h2>
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
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default SignupForm;
