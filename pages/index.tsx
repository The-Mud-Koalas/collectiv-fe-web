import EventParticipationPopup from "@/components/features/event/participation/EventParticipationPopup";
import { Home } from "@/components/features/home/HomePage";
import LocationSubscription from "@/components/features/home/LocationSubscription/LocationSubscription";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function HomePage() {
    // return <Home />;
    return <LocationSubscription />;
}

HomePage.auth = false;
export default HomePage;
