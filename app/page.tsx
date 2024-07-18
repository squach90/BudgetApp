import Image from "next/image";
import Home from "./Home/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budget Manager",
  description: "Simple Budget Manager build in 4h",
  icons: {
    icon: "/public/logo.png",
  },
};

export default function Main() {
  return (
    <div>
      <Home />
    </div>
  );
}
