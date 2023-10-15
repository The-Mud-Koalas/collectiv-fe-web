import { Home } from "@/components/features/home/HomePage";
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
