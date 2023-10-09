import EventParticipationPopup from "@/components/features/event/participation/EventParticipationPopup";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function HomePage() {
    return <EventParticipationPopup />;
}

HomePage.auth = false;
export default HomePage;
