import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./JobPage.css";
import Header from "../header/header";
import Footer from "../footer/footer";

interface Vacancy {
    logo: string;
    id: string;
    office: string;
    organization: string;
    salary: string;
    description: string;
    telegram: string;
    skype: string;
    email: string;
    phone: string;
    jobType: string;
}

function JobPage() {
    const { id } = useParams<{ id: string }>();
    const [vacancy, setVacancy] = useState<Vacancy | null>(null);

    useEffect(() => {
        axios
            .get(`https://01de09931cc9286e.mokky.dev/allvakansies/${id}`)
            .then((response) => {
                setVacancy(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch vacancy:", error);
            });
    }, [id]);

    const removeVacancy = useCallback(
        (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            axios
                .delete(`https://01de09931cc9286e.mokky.dev/allvakansies/${id}`)
                .then(() => {
                    setVacancy(null);
                })
                .catch((error) => {
                    console.error("Failed to delete vacancy:", error);
                });
        },
        []
    );

    if (!vacancy) {
        return <div className="vacancy-not-found">Вакансия удален</div>;
    }

    return (
        <>
            <Header isRegistered={false} />
            <div className="container">
                <div className="job-list-container">
                    <div className="logo-office">
                        <img src={vacancy.logo} alt="" />
                        <h2>
                            {" "}
                            <p>Компания</p>
                            {vacancy.office}
                        </h2>
                    </div>
                    <div className="job__organization">
                        <h4>Организация </h4>
                        <p>{vacancy.organization}</p>
                    </div>
                    <div className="job__salary">
                        <h4>Оклад:</h4>
                        <p>{vacancy.salary}</p>
                    </div>
                    <div className="job__type">
                        <h4>Тип </h4>
                        <p>{vacancy.jobType}</p>
                    </div>
                    <div className="job__description">
                        <h4 className="job__description">Описание:</h4>
                        <p>{vacancy.description}</p>
                    </div>
                    <div className="job__contact__info">
                        <h4 className="telegram">Telegram</h4>
                        <p>
                            {vacancy.telegram && (
                                <a
                                    href={`https://t.me/${vacancy.telegram}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {vacancy.telegram}
                                </a>
                            )}
                        </p>
                        <h4 className="skype">Skype </h4>
                        <p>
                            {vacancy.skype && (
                                <a
                                    href={`skype:${vacancy.skype}?chat`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {vacancy.skype}
                                </a>
                            )}
                        </p>

                        <h4 className="email">E-Mail</h4>
                        <p>
                            {vacancy.email && (
                                <a
                                    href={`mailto:${vacancy.email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {vacancy.email}
                                </a>
                            )}
                        </p>

                        <h4 className="phone">Телефон </h4>
                        <p>
                            {vacancy.phone && (
                                <a
                                    href={`tel:${vacancy.phone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {vacancy.phone}
                                </a>
                            )}
                        </p>
                    </div>
                    <button
                        className="delete-button"
                        type="button"
                        onClick={(e) => removeVacancy(vacancy.id, e)}
                    >
                        Удалить вакансию
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default JobPage;
