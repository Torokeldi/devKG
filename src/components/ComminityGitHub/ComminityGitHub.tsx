import { useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import { Job } from "../../Hooks/types";
import { FaGithubAlt } from "react-icons/fa6";
import "../ComminityGitHub/ComminityGitHub.css";

function CommunitycomponentChats() {
    const { data, isLoading } = useFetch({
        url: "http://3.38.98.134/community",
    });

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            console.log(data);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data || !Array.isArray(data)) {
        return <div>Маалыматтар алынган жок же структура туура эмес</div>;
    }

    return (
        <div className="CommunitycomponentChats">
            <div className="container">
                <h4 className="CommunitycomponentChats-title">GitHub</h4>
                {data.map((job: Job, index: number) => (
                    <div key={index} className="content__chats">
                        <div className="content__chats__resources">
                            <div className="content__chats__resources_resources_reources">
                                {Array.isArray(job.devkg) &&
                                    job.github.map((chat, idx) => (
                                        <div key={idx} className="gitHub-block">
                                            <span>
                                                <FaGithubAlt />
                                            </span>

                                            <a
                                                href={chat.value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <div className="chat-label">
                                                    <p>{chat.label}</p>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommunitycomponentChats;
