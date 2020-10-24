import React from "react";
import Dashboard from "../contentItems/dashboard";
import Report from "../contentItems/report";
import Ticket from "../contentItems/ticket";
import Users from "../contentItems/users";
import MutateUser from "../contentItems/users/mutateUser";
import Transactions from "../contentItems/transactions";
import MutateTransaction from "../contentItems/transactions/mutateTransaction";
import Leagues from "../contentItems/league";
import Fixtures from "../contentItems/fixture";
import Sports from "../contentItems/sport";
import Countries from "../contentItems/country";
import Markets from "../contentItems/market";
import Shop from "../contentItems/shop";
import MutateShop from "../contentItems/shop/mutateShop";
// import {
//   DashboardRounded,
//   SportsBaseballRounded,
//   PublicRounded,
//   TheatersRounded,
//   FeaturedPlayListRounded,
//   GroupRounded,
//   ShoppingCartRounded,
//   VisibilityRounded,
//   StoreRounded,
//   AccountBalanceWalletRounded,
//   AssessmentRounded,
//   SettingsRounded,
//   SportsKabaddiRounded,
// } from "@material-ui/icons";
// import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
// import SportsBaseballRoundedIcon from "@material-ui/icons/SportsBaseballRounded";
// import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
// import TheatersRoundedIcon from "@material-ui/icons/TheatersRounded";
// import FeaturedPlayListRoundedIcon from "@material-ui/icons/FeaturedPlayListRounded";
// import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
// import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
// import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
// import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
// import AccountBalanceWalletRoundedIcon from "@material-ui/icons/AccountBalanceWalletRounded";
// import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";
// import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
// import SportsKabaddiRoundedIcon from "@material-ui/icons/SportsKabaddiRounded";

import DashboardRoundedIcon from "@material-ui/icons/DashboardTwoTone";
import SportsBaseballRoundedIcon from "@material-ui/icons/SportsBaseballTwoTone";
import PublicRoundedIcon from "@material-ui/icons/PublicTwoTone";
import TheatersRoundedIcon from "@material-ui/icons/TheatersTwoTone";
import FeaturedPlayListRoundedIcon from "@material-ui/icons/FeaturedPlayListTwoTone";
import GroupRoundedIcon from "@material-ui/icons/GroupTwoTone";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartTwoTone";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityTwoTone";
import StoreRoundedIcon from "@material-ui/icons/StoreTwoTone";
import AccountBalanceWalletRoundedIcon from "@material-ui/icons/AccountBalanceWalletTwoTone";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentTwoTone";
import SettingsRoundedIcon from "@material-ui/icons/SettingsTwoTone";
import SportsKabaddiRoundedIcon from "@material-ui/icons/SportsKabaddiTwoTone";
import { RouterOutlined } from "@material-ui/icons";

const CategorizedSuperAdminRoutes = [
  {
    categoryName: "Data",
    permission: ["SUPER_ADMIN", "ADMIN"],
    items: [
      {
        menuName: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardRoundedIcon style={{ fontSize: "20px" }} />,
        content: Dashboard,
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        menuName: "Reports",
        path: "/admin/reports",
        icon: <AssessmentRoundedIcon style={{ fontSize: "20px" }} />,
        content: Report,
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },

  {
    categoryName: "Main",
    permission: ["SUPER_ADMIN", "ADMIN"],
    items: [
      {
        menuName: "Sports",
        path: "/admin/sports",
        icon: <SportsBaseballRoundedIcon style={{ fontSize: "20px" }} />,
        content: Sports,
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        menuName: "Tickets",
        path: "/admin/tickets",
        icon: <TheatersRoundedIcon style={{ fontSize: "20px" }} />,
        content: Ticket,
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        menuName: "Countries",
        path: "/admin/countries",
        icon: <PublicRoundedIcon style={{ fontSize: "20px" }} />,
        content: Countries,
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        //
        menuName: "Leagues",
        path: "/admin/leagues",
        icon: <FeaturedPlayListRoundedIcon style={{ fontSize: "20px" }} />,
        content: Leagues,
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        menuName: "Markets",
        path: "/admin/markets",
        icon: <ShoppingCartRoundedIcon style={{ fontSize: "20px" }} />,
        content: Markets,
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        menuName: "Shops",
        path: "/admin/shops",
        icon: <StoreRoundedIcon style={{ fontSize: "20px" }} />,
        content: Shop,
        subRoutes: [
          { path: "/create", content: MutateShop, subRouteName: "Create shop" },
          { path: "/edit/:id", content: MutateShop, subRouteName: "Edit shop" },
        ],
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        menuName: "Fixtures",
        path: "/admin/fixtures",
        icon: <SportsKabaddiRoundedIcon style={{ fontSize: "20px" }} />,
        content: Fixtures,
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },

  {
    categoryName: "Customer",
    permission: ["SUPER_ADMIN", "ADMIN"],
    items: [
      {
        menuName: "Users",
        path: "/admin/users",
        icon: <GroupRoundedIcon style={{ fontSize: "20px" }} />,
        content: Users,
        permission: ["ADMIN"],
        subRoutes: [
          {
            path: "/create",
            content: MutateUser,
            subRouteName: "Create user",
            permission: ["SUPER_ADMIN", "ADMIN"],
          },
          {
            path: "/edit/:id",
            content: MutateUser,
            subRouteName: "Edit user",
            permission: ["SUPER_ADMIN", "ADMIN"],
          },
        ],
      },
      {
        menuName: "Transactions",
        path: "/admin/transactions",
        icon: <AccountBalanceWalletRoundedIcon style={{ fontSize: "20px" }} />,
        content: Transactions,
        permission: ["SUPER_ADMIN", "ADMIN"],
        subRoutes: [
          {
            path: "/create",
            content: MutateTransaction,
            subRouteName: "Create transaction",
            permission: ["SUPER_ADMIN", "ADMIN"],
          },
        ],
      },
    ],
  },

  {
    categoryName: "Application",
    permission: ["SUPER_ADMIN", "ADMIN"],
    items: [
      {
        menuName: "Advertisements",
        path: "/admin/advertisements",
        icon: <VisibilityRoundedIcon style={{ fontSize: "20px" }} />,
        content: Dashboard,
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        menuName: "Settings",
        path: "/admin/settings",
        icon: <SettingsRoundedIcon style={{ fontSize: "20px" }} />,
        content: Dashboard,
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
];

const CategorizedAdminRoutes = [
  {
    categoryName: "Data",
    permission: ["SUPER_ADMIN", "ADMIN"],
    items: [
      {
        menuName: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardRoundedIcon style={{ fontSize: "20px" }} />,
        content: Dashboard,
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        menuName: "Reports",
        path: "/admin/reports",
        icon: <AssessmentRoundedIcon style={{ fontSize: "20px" }} />,
        content: Report,
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },

  {
    categoryName: "Main",
    permission: ["SUPER_ADMIN", "ADMIN"],
    items: [
      // {
      //   menuName: "Sports",
      //   path: "/admin/sports",
      //   icon: <SportsBaseballRoundedIcon style={{ fontSize: "20px" }} />,
      //   content: Dashboard,
      //   permission: ["SUPER_ADMIN", "ADMIN"],
      // },
      {
        menuName: "Tickets",
        path: "/admin/tickets",
        icon: <TheatersRoundedIcon style={{ fontSize: "20px" }} />,
        content: Ticket,
        permission: ["SUPER_ADMIN", "ADMIN"],
      },
      // {
      //   menuName: "Countries",
      //   path: "/admin/countries",
      //   icon: <PublicRoundedIcon style={{ fontSize: "20px" }} />,
      //   content: Dashboard,
      //   permission: ["SUPER_ADMIN", "ADMIN"],
      // },
      // {
      //   //
      //   menuName: "Leagues",
      //   path: "/admin/leagues",
      //   icon: <FeaturedPlayListRoundedIcon style={{ fontSize: "20px" }} />,
      //   content: Dashboard,
      //   permission: ["SUPER_ADMIN", "ADMIN"],
      // },
      // {
      //   menuName: "Markets",
      //   path: "/admin/markets",
      //   icon: <ShoppingCartRoundedIcon style={{ fontSize: "20px" }} />,
      //   content: Dashboard,
      //   permission: ["SUPER_ADMIN", "ADMIN"],
      // },
      // {
      //   menuName: "Shops",
      //   path: "/admin/shops",
      //   icon: <StoreRoundedIcon style={{ fontSize: "20px" }} />,
      //   content: Dashboard,
      //   subRoutes: [{ path: "/create", content: Report }],
      //   permission: ["SUPER_ADMIN", "ADMIN"],
      // },
      // {
      //   menuName: "Fixtures",
      //   path: "/admin/fixtures",
      //   icon: <SportsKabaddiRoundedIcon style={{ fontSize: "20px" }} />,
      //   content: Dashboard,
      //   permission: ["SUPER_ADMIN", "ADMIN"],
      // },
    ],
  },

  {
    categoryName: "Customer",
    permission: ["SUPER_ADMIN", "ADMIN"],
    items: [
      {
        menuName: "Users",
        path: "/admin/users",
        icon: <GroupRoundedIcon style={{ fontSize: "20px" }} />,
        content: Users,
        permission: ["ADMIN"],
        // subRoutes: [
        //   {
        //     path: "/create",
        //     content: MutateUser,
        //     subRouteName: "Create user",
        //     permission: ["SUPER_ADMIN", "ADMIN"],
        //   },
        //   {
        //     path: "/edit/:id",
        //     content: MutateUser,
        //     subRouteName: "Edit user",
        //     permission: ["SUPER_ADMIN", "ADMIN"],
        //   },
        // ],
      },
      {
        menuName: "Transactions",
        path: "/admin/transactions",
        icon: <AccountBalanceWalletRoundedIcon style={{ fontSize: "20px" }} />,
        content: Transactions,
        permission: ["SUPER_ADMIN", "ADMIN"],
        subRoutes: [
          {
            path: "/create",
            content: MutateTransaction,
            subRouteName: "Create transaction",
            permission: ["SUPER_ADMIN", "ADMIN"],
          },
        ],
      },
    ],
  },

  // {
  //   categoryName: "Application",
  //   permission: ["SUPER_ADMIN", "ADMIN"],
  //   items: [
  //     {
  //       menuName: "Advertisements",
  //       path: "/admin/advertisements",
  //       icon: <VisibilityRoundedIcon style={{ fontSize: "20px" }} />,
  //       content: Dashboard,
  //       permission: ["SUPER_ADMIN", "ADMIN"],
  //     },
  //     {
  //       menuName: "Settings",
  //       path: "/admin/settings",
  //       icon: <SettingsRoundedIcon style={{ fontSize: "20px" }} />,
  //       content: Dashboard,
  //       permission: ["SUPER_ADMIN", "ADMIN"],
  //     },
  //   ],
  // },
];

const getAuthorizedRoutes = (role) => {
  if (role === "SUPER_ADMIN") {
    return CategorizedSuperAdminRoutes;
  }
  if (role === "ADMIN") {
    return CategorizedAdminRoutes;
  }
};

export default getAuthorizedRoutes;
