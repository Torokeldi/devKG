/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import { Job } from "../../Hooks/types";
import "./OrganizationItem.css";
import { useNavigate } from "react-router-dom";

const OrganizationItem: React.FC = () => {
  const { data, isLoading } = useFetch({
    url: "http://3.38.98.134/organizations",
  });
  const navigate = useNavigate();
  const [companyNames, setCompanyNames] = useState<string[]>([]);

  const defaultIcon =
    "https://devkg.com/images/organizations/733525f43fb53ec1ff2912d7365232dd.png";

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

  const handleClick = (id: string) => {
    navigate(`/organizations/${id}`);
  };

  return (
    <div>
      {Array.isArray(data) &&
        data.map((job: Job) => (
          <div
            className="organization__item"
            key={job.id}
            onClick={() => handleClick(job.id)}
          >
            <div className="organizationItem_left">
              <div className="organization_logo">
                <img src={job.icon || defaultIcon} alt="" />
              </div>
              <div className="organization_details">
                <b className="organization__title">Компания</b>
                <b className="organization__name">{job.name || "Не указано"}</b>
              </div>
            </div>

            <div className="organizationItem_right">
              <div className="organization_details">
                <b className="organization__title">Вакансий: </b>
                <b className="organization__num">{job.jobs_count || 0}</b>
              </div>
              <div className="organization_details">
                <b className="organization__title">Мероприятий: </b>
                <b className="organization__num">{job.events_count || 0}</b>
              </div>
              <div className="organization_details">
                <b className="organization__title">Видео: </b>
                <b className="organization__num">{job.meetups_count || 0}</b>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrganizationItem;
