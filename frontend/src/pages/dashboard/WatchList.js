import React, { useState, useContext } from "react";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import GeneralContext from "../../services/GeneralContext";
import {holdings as watchlist } from "../../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const data = {
    labels: watchlist.map((s) => s.name),
    datasets: [
      {
        label: "Price",
        data: watchlist.map((s) => s.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
    className="watchlist-container"
    style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",          // 🔥 NOT 100vh
      minHeight: 0,            // 🔥 CRITICAL
      borderRight: "1px solid #eee",
    }}
  >
   {/* SEARCH BAR */}
<div
  className="px-3 py-2 border-bottom d-flex align-items-center gap-2"
  style={{ flexShrink: 0 }}
>
  <input
    type="text"
    placeholder="Search eg: INFY, BSE, Nifty Fut ..."
    className="form-control form-control-sm"
    style={{ fontSize: "13px" }}
  />

  <span
    className="text-muted small"
    style={{ whiteSpace: "nowrap" }}
  >
    {watchlist.length} / 50
  </span>
</div>
   {/* TABLE HEADER */}
<div
  className="px-3 py-2 border-bottom text-muted small d-flex fw-semibold"
  style={{ flexShrink: 0 }}
>
  <div className="col-4">Name</div>
  <div className="col-2 text-end">Avg</div>
  <div className="col-2 text-end">Price</div>
  <div className="col-2 text-end">Day</div>
  <div className="col-2 text-end">Net</div>
</div>
    {/* LIST */}
    <ul
      className="list"
      style={{
        flexGrow: 1,
        minHeight: 0,       
        overflowY: "auto",
        margin: 0,
        padding: 0,
      }}
    >
      {watchlist.map((stock, index) => (
        <WatchListItem stock={stock} key={index} />
      ))}
    </ul>

    {/* CHART */}
    <div
  style={{
    height: "260px",
    width: "100%",
    padding: "12px",
    borderTop: "1px solid #eee",
    boxSizing: "border-box",
    flexShrink: 0,
  }}
>
  <DoughnutChart data={data} />
</div>

  </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);

  const isNegativeDay = String(stock.percent).startsWith("-");

  return (
    <li
      className="px-3 py-2 border-bottom position-relative watchlist-row"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex align-items-center small">

        {/* NAME */}
        <div className="col-4 fw-semibold">
          {stock.name}
        </div>

        {/* AVG */}
        <div className="col-2 text-end text-muted">
          {stock.avg ?? "-"}
        </div>

        {/* PRICE */}
        <div className="col-2 text-end fw-semibold">
          {stock.price}
        </div>

        {/* DAY (RED/GREEN) */}
        <div
          className={`col-2 text-end ${
            isNegativeDay ? "text-danger" : "text-success"
          }`}
        >
          {isNegativeDay ? (
            <KeyboardArrowDown fontSize="small" />
          ) : (
            <KeyboardArrowUp fontSize="small" />
          )}
          {stock.percent}
        </div>

        {/* NET (ALWAYS NEUTRAL) */}
        <div className="col-2 text-end fw-semibold text-dark">
          {stock.net ?? stock.percent}
        </div>
      </div>

      {showActions && <WatchListActions stock={stock} />}
    </li>
  );
};


const WatchListActions = ({ stock }) => {
  const { openOrderWindow } = useContext(GeneralContext);

  return (
    <div
      className="position-absolute top-50 end-0 translate-middle-y me-2 d-flex gap-1"
      style={{ zIndex: 10 }}
    >
      <Tooltip title="Buy" arrow TransitionComponent={Grow}>
        <button
          className="btn btn-sm btn-success"
          onClick={() => openOrderWindow(stock, "BUY")}
        >
          Buy
        </button>
      </Tooltip>

      <Tooltip title="Sell" arrow TransitionComponent={Grow}>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => openOrderWindow(stock, "SELL")}
        >
          Sell
        </button>
      </Tooltip>

      <button className="btn btn-sm btn-light">
        <BarChartOutlined fontSize="small" />
      </button>

      <button className="btn btn-sm btn-light">
        <MoreHoriz fontSize="small" />
      </button>
    </div>
  );
};
