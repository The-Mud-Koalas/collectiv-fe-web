import EventParticipationPopup from "@/components/features/event/participation/EventParticipationPopup";
import { Home } from "@/components/features/home";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function HomePage() {
    return <Home />;
}

HomePage.auth = false;
export default HomePage;
