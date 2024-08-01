import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import { SlArrowRightCircle } from "react-icons/sl";
import Cookies from "js-cookie";
import "./header.css";

const Header: React.FC<{ isRegistered: boolean }> = ({ isRegistered }) => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const navigate = useNavigate();

  const logoHeader = () => navigate("/");
  const toggleBurgerMenu = () => setIsBurgerOpen(!isBurgerOpen);
  const handleJobsClick = () => navigate("/JobOpenings");
  const token = Cookies.get("token");

  return (
    <div className="header">
      <div className="container">
        <div className="header__content">
          <div className="header-logo" onClick={logoHeader}>
            <img src="https://devkg.com/js/img/logo.458f2cd.svg" alt="Logo" />
          </div>

          <div className="header__nav">
            <span onClick={handleJobsClick} className="nav-link">Вакансии</span>
            <Link to="/Events" className="nav-link">Мероприятия</Link>
            <Link to="/Video" className="nav-link">Видео</Link>
            <Link to="/Organizations" className="nav-link">Организации</Link>
            <Link to="/Community" className="nav-link">Сообщество</Link>
          </div>

          <div className="header__menu-and-clicker">
            <div className="header__burger" onClick={toggleBurgerMenu}>
              <div className={`hamburger ${isBurgerOpen ? "is-active" : ""}`}>
                <div className="hamburger-box">
                  <div className="hamburger-inner"></div>
                </div>
              </div>
            </div>

            <div className={`burger-menu ${isBurgerOpen ? "active" : ""}`}>
              <nav className="burger-menu__list">
                <div className="burger-menu__list__links">
                  <Link className="burger-menu__list-logo" to="/" onClick={toggleBurgerMenu}>
                    <img src="https://devkg.com/js/img/logo.458f2cd.svg" alt="Logo" />
                  </Link>
                  <span onClick={handleJobsClick} className="burger-menu-link">Вакансии</span>
                  <Link to="/Events" className="burger-menu-link" onClick={toggleBurgerMenu}>Мероприятия</Link>
                  <Link to="/Video" className="burger-menu-link" onClick={toggleBurgerMenu}>Видео</Link>
                  <Link to="/Organizations" className="burger-menu-link" onClick={toggleBurgerMenu}>Организации</Link>
                  <Link to="/Community" className="burger-menu-link" onClick={toggleBurgerMenu}>Сообщество</Link>
                </div>
                <div className="burger-menu__close" onClick={toggleBurgerMenu}>
                  <VscClose />
                </div>
              </nav>
            </div>

            {!token && (
              <div className="header__enter" onClick={() => navigate("/DevForms")}>
                <button>
                  <SlArrowRightCircle />
                  Войти
                </button>
              </div>
            )}
            <div className="header__enter__two">
              <SlArrowRightCircle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
