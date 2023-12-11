import React from "react";
import Newsletter from "./Newsletter";
import Volunteer from "./Volunteer";
import img from "../../../assets/images/bg/bg-2.jpg";

export default function Forms() {
  return (
    <section
      className="ftco-section-3 img"
      style={{ backgroundImage: "url(assets/images/bg/bg-3.jpg)" }}
      id="forms"
    >
      <div className="overlay" />
      <div className="container mb-5">
        <div className="row d-md-flex">
          <div className="col-md-12 volunteer">
            <Newsletter />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-md-flex">
          <div className="col-md-6 d-flex">
            <div
              className="img img-2 align-self-stretch"
              style={{ backgroundImage: `url(${img})` }}
            />
          </div>
          <div className="col-md-6 volunteer pl-md-5">
            <Volunteer />
          </div>
        </div>
      </div>
    </section>
  );
}
