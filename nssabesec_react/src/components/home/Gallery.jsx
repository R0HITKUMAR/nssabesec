import React from "react";
import { useNavigate } from "react-router-dom";
import Demo from "../../assets/images/gallery.png";

export default function Gallery() {
  const navigate = useNavigate();
  return (
    <section className="ftco-gallery">
      <img src={Demo} width="100%" alt="Gallery" />
      <div className="container mt-3">
        <button
          onClick={() => navigate("/gallery")}
          className="btn btn-primary btn-block"
        >
          Gallery
        </button>
      </div>
    </section>
  );
}
