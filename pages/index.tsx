import type { NextPage } from "next";
import LeftNavigation from "../components/left-navigation";
import MainContent from "../components/main-content";

const Home: NextPage = () => {
  return (
    <>
      <div className="lg:flex xl:flex-row flex-grow  min-h-screen">
        <LeftNavigation />
        <MainContent />
        <div className="lg:w-48 ">Right Bar</div>
      </div>
    </>
  );
};

export default Home;
