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

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250,250,250)" }}>
      <div className="container border-top ">
        <div className="row mt-5">
          <div className="col">
            <img src="media/images/logo.svg" style={{ width: "50%" }}></img>
            <p>&copy;2010-2026, Zerodha Broking Ltd. All rights reserved.</p>
            <div className="d-flex gap-4 ">
              <a href="#" className="text-dark fs-5">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-dark fs-5">
                <FaXTwitter />
              </a>
              <a href="#" className="text-dark fs-5">
                <FaFacebookF />
              </a>
              <a href="#" className="text-dark fs-5">
                <FaInstagram />
              </a>
            </div>
            <div className="d-flex gap-4 ">
              <a href="#" className="text-dark fs-5">
                <FaYoutube />
              </a>
              <a href="#" className="text-dark fs-5">
                <FaWhatsapp />
              </a>
              <a href="#" className="text-dark fs-5">
                <FaTelegram />
              </a>
            </div>
          </div>
          <div className="col">
            <p>Company</p>
            <a href="#" style={{ textDecoration: "none" }}>
              About
            </a>
            <br></br>
            <a href="#" style={{ textDecoration: "none" }}>
              Products
            </a>
            <br></br>
            <a href="#" style={{ textDecoration: "none" }}>
              Pricing
            </a>
            <br></br>
            <a href="#" style={{ textDecoration: "none" }}>
              Referral programme
            </a>
            <br></br>
            <a href="#" style={{ textDecoration: "none" }}>
              Careers
            </a>
            <br></br>
            <a href="#" style={{ textDecoration: "none" }}>
              Zerodha.tech
            </a>
            <br></br>
            <a href="#" style={{ textDecoration: "none" }}>
              Press & media
            </a>
            <br></br>
            <a href="#" style={{ textDecoration: "none" }}>
              Zerodha cares (CSR)
            </a>
          </div>
          <div className="col">
            <p>Support</p>
            <a href="#" style={{ textDecoration: "none" }}>
              Contact
            </a>
            <br></br>
            <a href="#" style={{ textDecoration: "none" }}>
              Support portal
            </a>
            <br></br>
            <a href="#" style={{ textDecoration: "none" }}>
              Z-Connect blog
            </a>
            <br></br>
            <a href="#" style={{ textDecoration: "none" }}>
              List of charges
            </a>
            <br></br>
            <a href="#" style={{ textDecoration: "none" }}>
              Downloads & resources
            </a>
          </div>
          <div className="col">
            <p>Account</p>
            <a href="#" style={{ textDecoration: "none" }}>
              Open an account
            </a>
            <br></br>
            <a href="#" style={{ textDecoration: "none" }}>
              Fund transfer
            </a>
            <br></br>
            <a href="#" style={{ textDecoration: "none" }}>
              60 day challenge
            </a>
          </div>
        </div>
        <div className="mt-5 footer-muted">
          <p>
            Zerodha Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration
            no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha
            Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Registered
            Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony,
            Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru -
            560078, Karnataka, India. For any complaints pertaining to
            securities broking please write to
            <a href="#"> complaints@zerodha.com</a>, for DP related to
            <a href="#"> dp@zerodha.com</a>. Please ensure you carefully read
            the Risk Disclosure Document as prescribed by SEBI | ICF
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

          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

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
          <p className="d-flex flex-wrap" style={{ gap: "12px" }}>
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
