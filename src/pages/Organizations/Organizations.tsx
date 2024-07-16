import React from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import OrganizationItem from "../../components/OrganizationItem/OrganizationItem";

const Organizations: React.FC = () => {
    return (
        <div>
            <Header />
            <div style={{ width: "50%", margin: "0 auto" }}>
                <OrganizationItem />
            </div>
            <Footer />
        </div>
    );
};

export default Organizations;
