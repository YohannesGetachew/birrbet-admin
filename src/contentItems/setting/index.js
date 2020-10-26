import { useQuery } from "@apollo/client";
import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import { APP } from "../../graphql/app";
import { CURRENT_USER } from "../../graphql/user";
import AppSetting from "./appSetting";
import ProfileSetting from "./profileSetting";
import RulesSetting from "./rulesSetting";

const Setting = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const {
    data: userData,
    loading: loadingUsers,
    error: errorLoadingUser,
  } = useQuery(CURRENT_USER);
  const {
    data: appData,
    loading: loadingAppData,
    error: errorLoadingAppData,
  } = useQuery(APP);
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  if (loadingAppData || loadingUsers) return <Loader />;
  if (errorLoadingAppData || errorLoadingUser) return <AlertError />;
  return (
    <>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        arial-label="Settings-tab"
      >
        <Tab label="App" />
        <Tab label="Rules" />
        <Tab label="Profile" />
      </Tabs>
      {currentTab === 0 && <AppSetting app={appData?.app} />}
      {currentTab === 1 && <RulesSetting app={appData?.app} />}
      {currentTab === 2 && <ProfileSetting user={userData?.whoami} />}
    </>
  );
};

export default Setting;
