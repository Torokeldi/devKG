import React, { useEffect, useState } from "react";
import "../OrganizationItem/OrganizationItem.css";
import useFetch from "../../Hooks/useFetch";
import { Job } from "../../Hooks/types";

function OrganizationItem() {
    const { data, isLoading } = useFetch({
        url: "http://3.38.98.134/organizations",
    });
    const [, setCompanyNames] = useState<string[]>([]);

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            const names = data.map(
                (job: Job) => job.organization_name || "Не указано"
            );
            setCompanyNames(names);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div id="vacancies">
                <div className="container">
                    <div className="vacancies__content">
                        {Array.isArray(data) &&
                            data.map((job: Job, index: number) => (
                                <a
                                    key={index}
                                    href={`/ru/jobs/${job.slug}`}
                                    className="link"
                                >
                                    <div
                                        className="content__organization"
                                        data-v-6dc437e8
                                    >
                                        <div
                                            className="information"
                                            data-v-6dc437e8
                                        >
                                            <div
                                                className="organization_logo"
                                                data-v-6dc437e8
                                            >
                                                {job.icon && (
                                                    <img
                                                        src={job.icon}
                                                        alt={`${job.name} logo`}
                                                        className="image"
                                                    />
                                                )}
                                            </div>
                                            <div
                                                className="jobs-item-field company"
                                                data-v-6dc437e8
                                            >
                                                <h5
                                                    className="label"
                                                    data-v-6dc437e8
                                                >
                                                    <p>Компания</p>
                                                    {job.name || "Не указано"}
                                                </h5>
                                            </div>
                                            <div
                                                className="jobs-item-field position"
                                                data-v-6dc437e8
                                            >
                                                <h5
                                                    className="label"
                                                    data-v-6dc437e8
                                                >
                                                    <p>Ваканции</p>
                                                    {job.jobs_count}
                                                </h5>
                                            </div>
                                            <div
                                                className="jobs-item-field price"
                                                data-v-6dc437e8
                                            >
                                                <h5
                                                    className="label"
                                                    data-v-6dc437e8
                                                >
                                                    <p>Мероприятия</p>
                                                    {job.events_count}
                                                </h5>
                                            </div>
                                            <div
                                                className="jobs-item-field type"
                                                data-v-6dc437e8
                                            >
                                                <h5
                                                    className="label"
                                                    data-v-6dc437e8
                                                >
                                                    <p>Видео</p>
                                                    {job.meetups_count}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrganizationItem;
