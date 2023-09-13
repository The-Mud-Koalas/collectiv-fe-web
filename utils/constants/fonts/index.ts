import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const garamond = localFont({
  src: [
    {
      path: "./AppleGaramond.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./AppleGaramond-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export { inter, garamond }
