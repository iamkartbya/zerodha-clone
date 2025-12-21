import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="support-hero mt-2">
      <div className="container">
        <div className="row align-items-center support-hero-row">
          
          {/* Left: Support Portal */}
          <div className="col-lg-8 col-md-12 support-left">
            <h1>Support Portal</h1>
            <p className="support-desc">
              Search for an answer or browse help topics to create a ticket
            </p>
            <input
              type="text"
              placeholder="Eg: how do I activate F&O, why is my order getting rejected."
              className="form-control my-3"
            />
            <div className="d-flex flex-wrap gap-2">
              <a href="#" className="support-link">Track account opening</a>
              <a href="#" className="support-link">Track segment activation</a>
              <a href="#" className="support-link">Intraday margins</a>
              <a href="#" className="support-link">Kite user manual</a>
            </div>
          </div>

          {/* Right: Track Ticket */}
          <div className="col-lg-4 col-md-12 support-right text-center">
            <div className="track-ticket-box p-4">
              <h3>Track Ticket</h3>
              <input
                type="text"
                placeholder="Enter Ticket ID"
                className="form-control my-3"
              />
              <button className="btn btn-light w-100 text-dark">Track</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
