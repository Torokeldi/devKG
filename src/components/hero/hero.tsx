import "./hero.css";
import "../../App.css";
import useFetch from "../../Hooks/useFetch";
import { useEffect, useState } from "react";
import { Job } from "../../Hooks/types"; // Here you import Job interface

function Hero() {
    const { data, isLoading } = useFetch({
        url: "http://3.38.98.134/events",
    });
    const [, setCompanyNames] = useState<string[]>([]);

    useEffect(() => {
        if (data.length > 0) {
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
            <div className="hero">
                <div className="container">
                    <div className="hero__content">
                        <div className="hero__content-h1">
                            Последние мероприятия
                        </div>
                        {data.map((job: Job, index: number) => (
                            <a
                                key={index}
                                href={`/ru/events/${job.id}`}
                                className="link"
                            >
                                <div className="hero__logo">
                                    <img src={job.cover} alt="" />
                                    <div className="hero__logo__text">
                                        <p>
                                            {job.date} <em>{job.time}</em>
                                        </p>
                                        <h2>{job.title}</h2>
                                    </div>
                                    <div className="hero__logo__organizer">
                                        <div className="hero-organizer">
                                            <p>Организатор</p>
                                            <h4>{job.organization_name}</h4>
                                        </div>
                                        <div className="hero-location">
                                            <p>Локация</p>
                                            <h4>{job.location}</h4>
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

export default Hero;
