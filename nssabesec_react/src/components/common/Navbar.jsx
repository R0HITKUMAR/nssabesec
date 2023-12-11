import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo/nssabesec.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(true);
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);

  const Links = [
    { name: "Home", link: "/" },
    { name: "Team", link: "/team" },
    { name: "Events", link: "/events" },
    { name: "Gallery", link: "/gallery" },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
      id="ftco-navbar"
    >
      <div className="container">
        <button onClick={() => navigate("/")}>
          <img alt="NSS ABESEC Logo" className="logos" src={Logo} height="50px" />
        </button>
        &nbsp;
        <button className="navbar-brand" onClick={() => navigate("/")}>
          NSS ABESEC
        </button>
        <button className="navbar-toggler" type="button" onClick={toggle}>
          {/* Fontaewsome Navbar */}
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={
            isOpen
              ? "collapse navbar-collapse"
              : "collapse navbar-collapse show"
          }
          id="ftco-nav"
        >
          <ul className="navbar-nav ml-auto">
            {Links.map((link, index) => {
              return (
                <li className="nav-item" key={index}>
                  <button
                    onClick={() => navigate(link.link)}
                    className="nav-link"
                  >
                    {link.name}
                  </button>
                </li>
              );
            })}
            <li className="nav-item">
              <a
                href="https://blog.nssabesec.ml"
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a
                href="https://admin.nssabesec.ml"
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
