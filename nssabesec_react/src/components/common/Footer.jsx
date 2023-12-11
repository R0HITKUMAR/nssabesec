import React from "react";
import { useNavigate } from "react-router-dom";
import ABESEC from "../../assets/images/logo/logo-abesec.png";
import NSS from "../../assets/images/logo/nss.png";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="ftco-footer ftco-section img">
      <div className="overlay" />
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-12">
            <div className="ftco-footer-widget">
              <h2 className="ftco-heading-2">About Us</h2>
              <img
                src={ABESEC}
                alt="ABES Logo"
                className="text-center"
                width="100px"
              />
              &amp;
              <img
                src={NSS}
                alt="NSS Logo"
                className="text-center"
                width="100px"
              />
              <p>
                National Service Scheme Club (ABES Engineering College) is a
                non-profit organization working for the welfare of the students
                of ABES Engineering College.
              </p>
              <ul className="ftco-footer-social list-unstyled float-md-left float-lft">
                <li>
                  <a href="mailto:nss@abes.ac.in">
                    <span className="icon-envelope" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/nssabesec/">
                    <span className="icon-facebook" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/nss_abesec/">
                    <span className="icon-instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-12">
            <div className="ftco-footer-widget ml-md-4">
              <h2 className="ftco-heading-2">Site Links</h2>
              <ul className="list-unstyled">
                <li>
                  <button onClick={() => navigate("/")}>Home</button>
                </li>
                <li>
                  <a href="https://nss.gov.in/">NSS Official Website</a>
                </li>
                <li>
                  <a href="https://abesec.in/club-nss.php">NSS @ABESEC</a>
                </li>
                <li>
                  <button onClick={() => navigate("/team")}>Team</button>
                </li>
                <li>
                  <button onClick={() => navigate("/events")}>Events</button>
                </li>
                <li>
                  <button onClick={() => navigate("/gallery")}>Gallery</button>
                </li>
                <li>
                  <a href="https://blog.nssabesec.in">Blog</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="ftco-footer-widget">
              <h2 className="ftco-heading-2">Have a Questions?</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li>
                    <span className="icon icon-map-marker" />
                    <span className="text">
                      NSS Club, ABES Engineering College (032) <br />
                      Campus - 1, 19th KM Stone, NH 24, Ghaziabad, Uttar Pradesh
                      201009
                    </span>
                  </li>
                  <li>
                    <a href="tel:+917836922049">
                      <span class="icon icon-phone"></span>
                      <span class="text">+91 7836922049 [Raghav Shah]</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:nss@abes.ac.in">
                      <span className="icon icon-envelope" />
                      <span className="text">nss@abes.ac.in</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "80%" }}>
            Copyright © NSS ABESEC 2022 | All Rights Reserved
            <br />
            Created with <i className="icon-heart" aria-hidden="true" /> by{" "}
            <a href="https://rohitkumar.ml" target="_blank" rel="noreferrer">
              Rohit Kumar (Digital Head)
            </a>
          </p>
        </div>
        <div className="row" style={{ fontSize: "80%" }}>
          <div className="col-lg-4 col-md-4" style={{ textAlign: "left" }}>
            <h6 className="remove">
              <small>Version No. : v2.1.221113</small>
            </h6>
          </div>
          <div
            className="col-lg-4 col-md-4 col-sm-10"
            style={{ textAlign: "center" }}
          >
            <img
              src="https://hitwebcounter.com/counter/counter.php?page=8024264&style=0007&nbdigits=5&type=ip&initCount=0"
              title="Free Counter"
              border={0}
              alt="Visitor Number"
            />
            <br />
          </div>
          <div className="col-lg-4 col-md-4" style={{ textAlign: "right" }}>
            <h6 className="remove">
              <small>Last Updated : 13 Nov 2022</small>
            </h6>
            <h6></h6>
          </div>
        </div>
      </div>
    </footer>
  );
}
