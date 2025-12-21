import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./TopBar";
import WatchList from "./WatchList";

import Summary from "./Summary";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Funds from "./Funds";
import Apps from "./Apps";

import { GeneralContextProvider } from "../../services/GeneralContext";

// Dynamic route configuration
const dashboardSections = [
  { path: "/", name: "Summary", component: <Summary /> },
  { path: "/orders", name: "Orders", component: <Orders /> },
  { path: "/holdings", name: "Holdings", component: <Holdings /> },
  { path: "/positions", name: "Positions", component: <Positions /> },
  { path: "/funds", name: "Funds", component: <Funds /> },
  { path: "/apps", name: "Apps", component: <Apps /> },
];

const Dashboard = () => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  return (
    <GeneralContextProvider>
      <div className="vh-100 d-flex flex-column">

        {/* TOP BAR */}
        <div className="sticky-top bg-white border-bottom">
          <TopBar />
        </div>

        {/* BODY */}
        <div className="container-fluid flex-grow-1">
          <div className="row h-100">

            {/* LEFT – WATCHLIST */}
            <div className="col-4 border-end p-0 h-100">
              <WatchList />
            </div>

            {/* RIGHT – DYNAMIC CONTENT */}
            <div className="col-8 p-3 h-100 overflow-auto">
              <Routes>
                {dashboardSections.map((section, idx) => (
                  <Route
                    key={idx}
                    path={section.path}
                    element={section.component}
                  />
                ))}
              </Routes>
            </div>

          </div>
        </div>

      </div>
    </GeneralContextProvider>
  );
};

export default Dashboard;
