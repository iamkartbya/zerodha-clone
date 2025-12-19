// frontend/src/landing_page/products/LeftSection.js
import React from "react";
import { Link } from "react-router-dom";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,      // Route string for Try Demo
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img src={imageURL} alt={productName} />
        </div>
        <div className="col-1"></div>
        <div className="col-5 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>

          <div>
            {tryDemo && (
              <Link
                to={tryDemo}
                style={{ textDecoration: "none", marginRight: "50px" }}
              >
                Try {productName}
                <i className="fa-solid fa-arrow-right-long ms-2"></i>
              </Link>
            )}
            {learnMore && (
              <Link
                to={learnMore}
                style={{ textDecoration: "none" }}
              >
                Learn More
                <i className="fa-solid fa-arrow-right-long ms-2"></i>
              </Link>
            )}
          </div>

          <div className="mt-3">
            {googlePlay && (
              <a href={googlePlay}>
                <img src="media/images/googlePlayBadge.svg" alt="Google Play"/>
              </a>
            )}
            {appStore && (
              <a href={appStore}>
                <img
                  src="media/images/appstoreBadge.svg"
                  style={{ marginLeft: "50px" }}
                  alt="App Store"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
