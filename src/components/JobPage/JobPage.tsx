import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./JobPage.css";

interface Vacancy {
  organization_icon: string;
  id: string;
  position: string;
  organization: string;
  salary: string;
  message: string;
  telegram: string;
  skype: string;
  email: string;
  phone: string;
  type: string;
}

const JobPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://3.38.98.134/jobs/${id}`)
        .then((response) => setVacancy(response.data))
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const removeVacancy = useCallback(() => {
    axios
      .delete(`http://3.38.98.134/jobs/${id}`)
      .then(() => navigate("/jobs"))
      .catch(console.error);
  }, [id, navigate]);

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (!vacancy) return <div className="vacancy-not-found">Вакансия удалена</div>;

  return (
    <>
      <Header isRegistered={false} />
      <div className="container">
        <div className="job-list-container">
          <div className="logo-position">
            <img src={vacancy.organization_icon} alt="Company logo" />
            <h2>{vacancy.position}</h2>
          </div>
          <p>{vacancy.organization}</p>
          <p>Оклад: {vacancy.salary}</p>
          <p>Тип: {vacancy.type}</p>
          <p>Описание: {vacancy.message}</p>
          <div className="job__contact__info">
            {vacancy.telegram && (
              <a href={`https://t.me/${vacancy.telegram}`} target="_blank" rel="noopener noreferrer">Telegram</a>
            )}
            {vacancy.skype && (
              <a href={`skype:${vacancy.skype}?chat`} target="_blank" rel="noopener noreferrer">Skype</a>
            )}
            {vacancy.email && (
              <a href={`mailto:${vacancy.email}`} target="_blank" rel="noopener noreferrer">E-Mail</a>
            )}
            {vacancy.phone && (
              <a href={`tel:${vacancy.phone}`} target="_blank" rel="noopener noreferrer">Телефон</a>
            )}
          </div>
          <button className="delete-button" onClick={removeVacancy}>Удалить вакансию</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobPage;
