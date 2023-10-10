import EventParticipationPopup from "@/components/features/event/participation/EventParticipationPopup";
import { Template } from "@/components/shared/layouts";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function HomePage() {
  return (
    <Template>
      <p>Test</p>
    </Template>
  );
}

HomePage.auth = false;
export default HomePage;
