import React from "react";
import { useNavigate } from "react-router-dom";
import Bg from "../../assets/images/bg/bg-6.png";

export default function Intro() {
  const navigate = useNavigate();
  return (
    <div
      className="hero-wrap"
      style={{ backgroundImage: `url(${Bg})` }}
      data-stellar-background-ratio="0.5"
    >
      <div className="overlay" />
      <div className="container">
        <div className="row no-gutters slider-text align-items-center justify-content-center">
          <div className="col-md-7 text-center">
            <p className="breadcrumbs">
              <span className="mr-2">
                <button onClick={() => navigate("/")}>Home</button>
              </span>
              <span>Gallery</span>
            </p>
            <h1 className="mb-3 bread">Galleries</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
