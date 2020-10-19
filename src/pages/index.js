import React from "react";
import Layout from "../components/layout";
import TopBar from "../components/topBar";
import SideBar from "../components/sideBar";
import Content from "../components/content";
import { CollapseContextProvider } from "../contexts/collapse";

const MainPage = () => {
  return (
    <CollapseContextProvider>
      <Layout topBar={<TopBar />} sideBar={<SideBar />} content={<Content />} />
    </CollapseContextProvider>
  );
};
export default MainPage;
