import React from "react";

export default function Card({ detail }) {
  return (
    <div className="col-md-4 p-2">
      <div className="staff" style={{height:"180px"}}>
        <div className="d-flex">
          <div
            className="img"
            style={{ backgroundImage: `url(${detail.dp})` }}
          />
          <div className="info ml-4">
            <h3 style={{ margin: "0px" }}>{detail.name}</h3>
            <small>{detail.email}</small>
            <span className="position">({detail.position})</span>
            <p className="team-social">
              <a href={`mailto:${detail.email}`}>
                <span className="fa fa-envelope" />
              </a>
              {detail.insta && (
                <a
                  href={detail.insta}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fa fa-instagram" />
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
