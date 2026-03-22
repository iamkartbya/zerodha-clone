import React, { useState, useContext } from "react";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import GeneralContext from "../../services/GeneralContext";
import { DoughnutChart } from "./DoughnoutChart";
import { watchlist as watchlistData } from "../../data/data";

const WatchList = () => {
  const { openOrderWindow } = useContext(GeneralContext);

  // 🔥 Static watchlist from data.js
  const [watchlist] = useState(watchlistData);

  const chartData = {
    labels: watchlist.map((s) => s.name),
    datasets: [
      {
        label: "Price",
        data: watchlist.map((s) => s.price || 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
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
        height: "100%",
        borderRight: "1px solid #eee",
      }}
    >
      {/* SEARCH */}
      <div className="px-3 py-2 border-bottom d-flex align-items-center gap-2">
        <input
          type="text"
          placeholder="Search eg: INFY, BSE, Nifty Fut ..."
          className="form-control form-control-sm"
        />
        <span className="text-muted small">{watchlist.length} / 50</span>
      </div>

      {/* HEADER */}
      <div className="px-3 py-2 border-bottom text-muted small d-flex fw-semibold">
        <div className="col-4">Name</div>
        <div className="col-2 text-end">Qty</div>
        <div className="col-2 text-end">Avg</div>
        <div className="col-2 text-end">Day</div>
        <div className="col-2 text-end">Net</div>
      </div>

      {/* LIST */}
      <ul
        className="list"
        style={{ margin: 0, padding: 0, overflowY: "auto" }}
      >
        {watchlist.map((stock, index) => (
          <WatchListItem
            key={index}
            stock={stock}
            openOrderWindow={openOrderWindow}
          />
        ))}
      </ul>

      {/* CHART */}
      <div
        style={{
          height: "260px",
          padding: "12px",
          borderTop: "1px solid #eee",
        }}
      >
        <DoughnutChart data={chartData} />
      </div>
    </div>
  );
};

export default WatchList;

/* ================= WATCHLIST ITEM ================= */

const WatchListItem = ({ stock, openOrderWindow }) => {
  const [showActions, setShowActions] = useState(false);

  const day = stock.day || "—";
  const net = stock.net || "—";
  const isNegativeDay = day.startsWith("-");

  return (
    <li
      className="px-3 py-2 border-bottom position-relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="d-flex align-items-center small">
        <div className="col-4 fw-semibold">{stock.name}</div>
        <div className="col-2 text-end">{stock.qty || 0}</div>
        <div className="col-2 text-end text-muted">{stock.avg || 0}</div>

        <div
          className={`col-2 text-end ${
            isNegativeDay ? "text-danger" : "text-success"
          }`}
        >
          {day !== "—" &&
            (isNegativeDay ? (
              <KeyboardArrowDown fontSize="small" />
            ) : (
              <KeyboardArrowUp fontSize="small" />
            ))}
          {day}
        </div>

        <div className="col-2 text-end fw-semibold">{net}</div>
      </div>

      {showActions && (
        <div className="position-absolute top-50 end-0 translate-middle-y me-2 d-flex gap-1">
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
      )}
    </li>
  );
};
