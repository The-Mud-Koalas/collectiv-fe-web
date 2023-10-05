import Image from "next/image";
import { Inter } from "next/font/google";
import { Template } from "@/components/shared/layouts";

const inter = Inter({ subsets: ["latin"] });

function HomePage() {
    return (
        <Template>
            <p>home</p>
        </Template>
    );
}

HomePage.auth = false;
export default HomePage;
