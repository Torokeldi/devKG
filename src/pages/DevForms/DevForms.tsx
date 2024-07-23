import React, { useState } from "react";
import "./DevForms.css";
import LoginForm from "../../components/Login/Login";
import SignupForm from "../../components/Signup/Signup";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const DevForms: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="container">
      <Header/>
      <div className="login-signup-btns">
        <button type="button" onClick={() => setShowLogin(false)}>
          Регистрация
        </button>
        <button type="button" onClick={() => setShowLogin(true)}>
          Авторизация
        </button>
      </div>
      <div className="content">
        {showLogin ? (
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        ) : (
          <SignupForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            email={email}
            setEmail={setEmail}
          />
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default DevForms;
