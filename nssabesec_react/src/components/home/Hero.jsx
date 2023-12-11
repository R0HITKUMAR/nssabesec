import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo/nss.png";
import LogoA from "../../assets/images/logo/logo-abesec.png";
import Bg from "../../assets/images/bg/bg-1.png";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="hero-wrap" style={{ backgroundImage: `url(${Bg})` }}>
      <div className="overlay" />
      <div className="container">
        <div className="row no-gutters slider-text align-items-center justify-content-center">
          <div className="col-md-10 text-center">
            <button onClick={() => navigate("/")}>
              <img className="logos" src={LogoA} height="100px" alt="ABES Logo" />
              &amp;
              <img className="logos" src={Logo} height="100px" alt="NSS Logo" />
            </button>
            <br />
            <h1 className="mb-4">NSS CLUB</h1>
            <p>(National Service Scheme)</p>
            <p className="mb-5">
              The National Service Scheme (NSS) is an Indian
              government-sponsored public service program conducted by the
              Department of Youth Affairs and Sports of the Government of India.
            </p>
            <p>
              <a
                href="https://nss.gov.in/"
                className="btn btn-white btn-outline-white px-4 py-3"
              >
                <span className="icon-web mr-2" />
                NSS Official Website
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
