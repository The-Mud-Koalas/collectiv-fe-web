import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Template: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="bg-tertiary-100 min-h-screen pt-[60px] sm:pt-0">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Template;
