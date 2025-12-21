import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  return (
    <nav className="bg-white border-bottom sticky-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between  my-3 ml-2">
          {/* LEFT: INDICES */}
          <div className="d-flex gap-2">
            <div className="d-flex ">
              <small className="fs-4 ">NIFTY 50</small>
              <span className="fw-bold ">100.2</span> &nbsp;
              <small className="text-success">+0.45%</small>
            </div>

            <div className="d-flex">
              <small className="fs-4 ">SENSEX</small>
              <span className="fw-bold">100.2</span>
              <small className="text-danger">-0.12%</small>
            </div>
            <div className="d-flex" style={{ marginLeft: "40px" }}>
              <img
                src="/logo.png"
                alt="Logo"
                style={{ height: "40px", cursor: "pointer" }}
              />
            </div>
          </div>
          <Menu />
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
