import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoginForm from "../../components/Login/Login";
import SignupForm from "../../components/Signup/Signup";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "./DevForms.css";

const DevForms: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
      navigate("/JobOpenings");
    }
  }, [navigate]);

  return (
    <div className="container">
      <Header isRegistered={isRegistered || isLoggedIn} />
      {!isLoggedIn && (
        <div className="login-signup-btns">
          <button type="button" onClick={() => setShowLogin(false)}>
            Регистрация
          </button>
          <button type="button" onClick={() => setShowLogin(true)}>
            Авторизация
          </button>
        </div>
      )}
      <div className="content">
        {isLoggedIn ? (
          <p>Вы уже авторизованы. Перенаправление...</p>
        ) : (
          showLogin ? (
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              setLoginStatus={setIsLoggedIn}
            />
          ) : (
            <SignupForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              email={email}
              setEmail={setEmail}
              setRegistrationStatus={setIsRegistered}
            />
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DevForms;
