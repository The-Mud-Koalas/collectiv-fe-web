import ReportModal from "@/components/features/event/reportEvent/ReportModal";
import { Home } from "@/components/features/home/HomePage";
import { Template } from "@/components/shared/layouts";
import { SetStateAction, useState } from "react";


function HomePage() {
    
    const [showModal, setShowModal] = useState<boolean>(true);
    // return <Home />;
    return (
        <Template>
            <Home />
        </Template>
    );
}

HomePage.auth = false;
export default HomePage;
