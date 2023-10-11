import EventParticipationPopup from "@/components/features/event/participation/EventParticipationPopup";
<<<<<<< HEAD
import { Home } from "@/components/features/home/HomePage";
import LocationSubscription from "@/components/features/home/LocationSubscription/LocationSubscription";
=======
import { Home } from "@/components/features/home";
import { Template } from "@/components/shared/layouts";
>>>>>>> 91f64fbcbb5f6ef429bf711fc250ad37ec93c526
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function HomePage() {
<<<<<<< HEAD
    // return <Home />;
    return <LocationSubscription />;
=======
  return (
    <Template>
      <Home/>
    </Template>
  );
>>>>>>> 91f64fbcbb5f6ef429bf711fc250ad37ec93c526
}

HomePage.auth = false;
export default HomePage;
