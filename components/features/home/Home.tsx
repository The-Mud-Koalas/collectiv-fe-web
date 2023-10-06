import { Button } from "@/components/shared/elements";
import { useAppContext } from "@/context/AppContext";
import { auth } from "@/lib/firebase";
import React, { useEffect } from "react";

const Home = () => {
  const { sendMessageToRN } = useAppContext();

  return (
    <>
      <div>Home</div>
    </>
  );
};

export default Home;
