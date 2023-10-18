import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { Button } from "../../elements";
import { Back } from "../../svg/icons";
import { COLORS } from "@/utils/constants/colors";

const Template: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const hideBackButtons = ["/", "/event/create"];

  return (
    <>
      <Navbar />
      <main className="bg-tertiary-100 min-h-screen pt-[60px] sm:pt-0">
        {!hideBackButtons.includes(router.asPath) && (
          <Button className="p-5" onClick={() => router.back()}>
            <Back color={COLORS.primary[800]} dimensions={{ width: 40 }} />
          </Button>
        )}
        {children}
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Template;
