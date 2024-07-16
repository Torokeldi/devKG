import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import "./Videos.css";
import useFetch from "../../Hooks/useFetch";
import { Job } from "../../Hooks/types";

const Video: React.FC = () => {
    const { data, isLoading } = useFetch({
        url: "http://3.38.98.134/meetups",
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
            <Header />
            <div id="Video">
                <div className="container">
                    <div className="btn-vkb">
                        <button>Добавить видео</button>
                    </div>
                    <div className="h11">
                        <h1>Все видео</h1>
                    </div>
                    <div className="video">
                        {Array.isArray(data) &&
                            data.map((job: Job, index: number) => (
                                <a
                                    key={index}
                                    href={`/ru/jobs/${job.slug}`}
                                    className="link"
                                >
                                    <div
                                        className="video__content"
                                        style={{
                                            backgroundImage: `url(${job.cover})`,
                                        }}
                                    >
                                        <div className="video-df">
                                            <div className="video-bg">
                                                <div className="vs-video">
                                                    <h1>{job.title}</h1>
                                                    <div className="video-text">
                                                        <h2>
                                                            <span>
                                                                Организатор
                                                            </span>
                                                            <br />
                                                            {job.organization_name ||
                                                                "Не указано"}
                                                        </h2>
                                                        <h2>
                                                            <span>Когда</span>
                                                            <br />
                                                            {job.date}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Video;
