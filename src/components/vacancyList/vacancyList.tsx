import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { Job } from "../../Hooks/types";
import "./vacancyList.css";

const VacancyList: React.FC = () => {
  const { data, isLoading, error } = useFetch<Job>({
    url: "http://3.38.98.134/jobs",
  });
  const navigate = useNavigate();

  const jobId = () => {
    const randomChars = Math.random().toString(6).substr(2, 8);
    return randomChars;
  };

  const handleVacancyClick = (id: string) => {
    navigate(`/jobpage/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="vacancies" className="container">
      {data.map((vacancy) => (
        <div
          key={vacancy.id || jobId()}
          className="VacancyList__item"
          onClick={() => handleVacancyClick(vacancy.id)}
        >
          <div className="vacancy_logo">
            <img
              src={vacancy.organization_icon}
              alt={`${vacancy.organization_name}`}
            />
          </div>
          <div className="vacancy-items">
            <div className="VacancyList__details">
              <b className="VacancyList__title">Компания</b>
              <b className="VacancyList__name">
                {vacancy.organization_name || "Не указано"}
              </b>
            </div>
            <div className="VacancyList__details">
              <b className="VacancyList__title">Должность</b>
              <b className="VacancyList__position">{vacancy.position}</b>
            </div>
            <div className="VacancyList__details">
              <b className="VacancyList__title">Оклад</b>
              <b className="VacancyList__salary">{vacancy.salary}</b>
            </div>
            <div className="VacancyList__details">
              <b className="VacancyList__title">Тип</b>
              <b className="VacancyList__type">{vacancy.type}</b>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VacancyList;
