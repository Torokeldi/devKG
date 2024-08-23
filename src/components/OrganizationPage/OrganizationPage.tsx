import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./OrganizationPage.css";

interface Organization {
  organization_icon: string;
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

const OrganizationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://3.38.98.134/organizations/${id}`)
        .then((response) => setOrganization(response.data))
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const removeOrganization = () => {
    axios
      .delete(`http://3.38.98.134/organizations/${id}`)
      .then(() => navigate("/organizations"))
      .catch(console.error);
  };

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (!organization) return <div className="organization-not-found">Организация не найдена</div>;

  return (
    <>
      <Header isRegistered={false} />
      <div className="container">
        <div className="organization-content">
          <div className="logo-section">
            <img src={organization.organization_icon} alt="Organization logo" />
            <h2>{organization.name}</h2>
          </div>
          <p>Описание: {organization.description}</p>
          <p>Адрес: {organization.address}</p>
          <div className="organization__contact__info">
            {organization.website && (
              <a href={organization.website} target="_blank" rel="noopener noreferrer">Вебсайт</a>
            )}
            {organization.email && (
              <a href={`mailto:${organization.email}`} target="_blank" rel="noopener noreferrer">E-Mail</a>
            )}
            {organization.phone && (
              <a href={`tel:${organization.phone}`} target="_blank" rel="noopener noreferrer">Телефон</a>
            )}
          </div>
          <button className="delete-button" onClick={removeOrganization}>Удалить организацию</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrganizationPage;
