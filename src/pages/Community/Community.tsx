import ComminityFacebook from "../../components/ComminityFacebook/ComminityFacebook";
import ComminityGitHub from "../../components/ComminityGitHub/ComminityGitHub";
import ComminityWebsite from "../../components/ComminityWebsite/ComminityWebsite";
import ComminityYouTube from "../../components/ComminityYouTube/ComminityYouTube";
import ComminitycomponentChannels from "../../components/ComminitycomponentChannels/ComminitycomponentChannels";
import ComminitycomponentChats from "../../components/ComminitycomponentChats/ComminitycomponentChats";
import Communitycomponent from "../../components/Communitycomponent/Communitycomponent";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

function Community() {
    return (
        <div>
            <Header isRegistered={false} />
            <Communitycomponent />
            <ComminitycomponentChats />
            <ComminitycomponentChannels />
            <ComminityWebsite />
            <ComminityFacebook />
            <ComminityYouTube />
            <ComminityGitHub />
            <Footer />
        </div>
    );
}

export default Community;
