import EventParticipationPopup from "@/components/features/event/participation/EventParticipationPopup";
import { Home } from "@/components/features/home/HomePage";
import LocationSubscription from "@/pages/event/locations";
import { Template } from "@/components/shared/layouts";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function HomePage() {
    // return <Home />;
    return (
        <Template>
            <Home />
        </Template>
    );
}

HomePage.auth = false;
export default HomePage;
