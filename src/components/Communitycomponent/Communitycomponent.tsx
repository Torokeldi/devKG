import { useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import "../Communitycomponent/Communitycomponent.css";
import { Job } from "../../Hooks/types";

function Communitycomponent() {
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
    console.log(data);

    return (
        <div className="Communitycomponent">
            <div className="container">
                <h4 className="Communitycomponent-title">
                    Наши ресурсы в Telegram
                </h4>
                {data.map((job: Job, index: number) => (
                    <div className="content">
                        <div className="content__resources">
                            <div className="content__resources_resources_reources">
                                {Array.isArray(job.devkg) &&
                                    job.devkg.map((chat, idx) => (
                                        <div key={idx} className="chat__block">
                                            <img
                                                src="https://yt3.googleusercontent.com/ANGnp5haaIF0osQ364o2QZ8vbMdsyWDkvlAcXkkvJXy2UpmauPnWFfLd1w0mEcaXncJpR7_j=s160-c-k-c0x00ffffff-no-rj"
                                                alt=""
                                            />
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

export default Communitycomponent;
// import { FaTelegramPlane } from "react-icons/fa";
// <FaTelegramPlane />
