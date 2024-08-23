import React, { useState } from "react";
import LeftSidebar from "../../components/leftSidebar/leftSidebar";
import VacancyForm from "../../components/vacancyForm/vacancyForm";
import Footer from "../../components/footer/footer";
import "./addVacancy.css";

function AddVacancy() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="container">
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        {isSidebarVisible ? "X" : "☰"}
      </button>
      <div className={`AddVacancy_content ${isSidebarVisible ? "show-sidebar" : ""}`}>
        <LeftSidebar />
        <div className="right-add-vacancy_wrapper">
          <h1 className="head-title">Добавить новую вакансию</h1>
          <p className="title-message">
            Вакансия должна относится к сфере информационных технологий и будет
            опубликована после проверки модератором
          </p>
          <VacancyForm />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AddVacancy;
