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
        const timestamp = Date.now();
        const randomChars = Math.random().toString(36).substr(2, 8);
        return `${timestamp}-${randomChars}`;
    };

    const handleVacancyClick = (id: string) => {
        navigate(`/JobPage/${id}`);
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
            <img src={vacancy.organization_icon} alt={`${vacancy.organization_name} logo`} />
        </div>
        <div className="vacancy-items">
            <div className="VacancyList__details">
                <b className="VacancyList__title">Компания</b>
                <b className="VacancyList__name">{vacancy.organization_name || "Не указано"}</b>
            </div>
            <div className="VacancyList__details">
                <b className="VacancyList__title">Должность</b>
                <b className="VacancyList__office">{vacancy.position}</b>
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
