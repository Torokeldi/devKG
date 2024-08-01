import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Hero from "../../components/hero/hero";

function Home() {
    return (
        <>
            <Header isRegistered={false} />
            <Hero />
            <Footer />
        </>
    );
}

export default Home;
