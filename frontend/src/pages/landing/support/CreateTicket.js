import React from "react";
import "./CreateTicket.css";

const ticketSections = [
  {
    title: "Account Opening",
    icon: "fa-circle-plus",
    links: [
      "Online Account Opening",
      "Offline Account Opening",
      "Company, Partnership and HUF Account Opening",
      "NRI Account Opening",
      "Charges at Zerodha",
      "Zerodha IDXC FIRST bank 3-in-1 Account",
      "Getting Started",
    ],
  },
  {
    title: "Your Zerodha Account",
    icon: "fa-user",
    links: [
      "Login Credential",
      "Account Modification and Segment Addition",
      "DP ID and bank details",
      "Your Profiles",
      "Transfer and conversion of shares",
    ],
  },
  {
    title: "Trading",
    icon: "fa-chart-column",
    links: [
      "Margin/leverage, Product and Order types",
      "Trading FAQs",
      "Corporate Actions",
      "Sentinel",
      "Kite API",
      "Pi and other platforms",
      "Stockreports+",
      "GTT",
    ],
  },
  {
    title: "Funds",
    icon: "fa-credit-card",
    links: [
      "Adding Funds",
      "Fund Withdrawal",
      "eMandates",
      "Adding Bank Accounts",
    ],
  },
  {
    title: "Console",
    icon: "fa-circle-notch",
    links: [
      "Reports",
      "Ledger",
      "Portfolio",
      "60 day Challenge",
      "IPO",
      "Referral Program",
    ],
  },
  {
    title: "Coin",
    icon: "fa-circle",
    links: [
      "Online Account Opening",
      "Understanding Mutual Funds",
      "About Coin",
      "Buying and Selling through Coin",
      "Starting an SIP",
      "Managing your Portfolio",
      "Moving to Coin",
      "Government Securities",
    ],
  },
];

function CreateTicket() {
  return (
    <section className="create-ticket container py-5">
      <h2 className="mb-4">To create a ticket, select a relevant topic</h2>
      <div className="row">
        {ticketSections.map((section) => (
          <div key={section.title} className="col-md-4 mb-4">
            <h4>
              <i className={`fa-solid ${section.icon} me-2`}></i>
              {section.title}
            </h4>
            {section.links.map((link) => (
              <p key={link}>
                <a href="#" className="ticket-link">{link}</a>
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CreateTicket;
