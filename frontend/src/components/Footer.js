import React from "react";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTelegram,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./Footer.css";

function Footer() {
  const companyLinks = [
    "About","Products","Pricing","Referral programme","Careers",
    "Zerodha.tech","Press & media","Zerodha cares (CSR)"
  ];

  const supportLinks = [
    "Contact","Support portal","Z-Connect blog","List of charges","Downloads & resources"
  ];

  const accountLinks = ["Open an account","Fund transfer","60 day challenge"];

  return (
    <footer className="footer">
      <div className="container border-top pt-5">
        <div className="row">
          {/* Logo & Social */}
          <div className="col-12 col-md-3 mb-4">
            <img src="media/images/logo.svg" alt="StockBaar Logo" className="footer-logo mb-3"/>
            <p className="text-muted">&copy;2010-2026, Zerodha Broking Ltd. All rights reserved.</p>

            <div className="d-flex gap-3 flex-wrap mb-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-icon"><FaLinkedinIn /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon"><FaXTwitter /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-icon"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon"><FaInstagram /></a>
            </div>

            <div className="d-flex gap-3 flex-wrap">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-icon"><FaYoutube /></a>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="footer-icon"><FaWhatsapp /></a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="footer-icon"><FaTelegram /></a>
            </div>
          </div>

          {/* Company Links */}
          <div className="col-6 col-md-3 mb-4">
            <h5>Company</h5>
            {companyLinks.map(text => <p key={text}><a href="#" className="footer-link">{text}</a></p>)}
          </div>

          {/* Support Links */}
          <div className="col-6 col-md-3 mb-4">
            <h5>Support</h5>
            {supportLinks.map(text => <p key={text}><a href="#" className="footer-link">{text}</a></p>)}
          </div>

          {/* Account Links */}
          <div className="col-12 col-md-3 mb-4">
            <h5>Account</h5>
            {accountLinks.map(text => <p key={text}><a href="#" className="footer-link">{text}</a></p>)}
          </div>
        </div>

        {/* Legal & Disclaimers */}
        <div className="footer-legal mt-5">
          {/* Your full Zerodha legal content goes here */}
          <p>
            Zerodha Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration
            no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha
            Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Registered
            Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony,
            Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru -
            560078, Karnataka, India. For any complaints pertaining to
            securities broking please write to
            <a href="mailto:complaints@zerodha.com"> complaints@zerodha.com</a>, for DP related to
            <a href="mailto:dp@zerodha.com"> dp@zerodha.com</a>. Please ensure you carefully read
            the Risk Disclosure Document as prescribed by SEBI | ICF.
          </p>
           <p>
            Procedure to file a complaint on <a href="#">SEBI SCORES</a>:
            Register on SCORES portal. Mandatory details for filing complaints
            on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits:
            Effective Communication, Speedy redressal of the grievances.
          </p>
           <p>
            <a href="#">Smart Online Dispute Resolution</a> |
            <a href="#"> Grievances Redressal Mechanism</a>
          </p>
          <p>Investments in securities market are subject to market risks; read all related documents carefully before investing.</p>
           <p>
            Attention investors: 1) Stock brokers can accept securities as
            margins from clients only by way of pledge in the depository system
            w.e.f September 01, 2020. 2) Update your e-mail and phone number
            with your stock broker / depository participant and receive OTP
            directly from depository on your e-mail and/or mobile number to
            create pledge. 3) Check your securities / MF / bonds in the
            consolidated account statement issued by NSDL/CDSL every month.
          </p>
           <p>
            India’s largest broker based on networth as per NSE.
            <a href="#"> NSE broker factsheet</a>
          </p>

          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets." If you find anyone claiming to be part of Zerodha and
            offering such services, please
            <a href="#"> create a ticket here</a>.
          </p>

          <p>
            *Customers availing insurance advisory services offered by Ditto
            (Tacterial Consulting Private Limited | IRDAI Registered Corporate
            Agent (Composite) License No CA0738) will not have access to the
            exchange investor grievance redressal forum, SEBI SCORES/ODR, or
            arbitration mechanism for such products.
          </p>

          <p className="d-flex flex-wrap gap-2">
            <a href="#">NSE</a>
            <a href="#">BSE</a>
            <a href="#">MCX</a>
            <a href="#">Terms & conditions</a>
            <a href="#">Policies & procedures</a>
            <a href="#">Privacy policy</a>
            <a href="#">Disclosure</a>
            <a href="#">For investor's attention</a>
            <a href="#">Investor charter</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
