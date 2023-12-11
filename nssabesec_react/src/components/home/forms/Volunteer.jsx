import React from "react";
import DB from "../../../firebase";

export default function Volunteer() {
  const [data, setData] = React.useState({
    Email_ID: "",
    Message: "",
    Name: "",
    Phone: "",
    Status: "Received",
  });

  const [alert, setAlert] = React.useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.Email_ID.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
      data.Message &&
      data.Name &&
      data.Phone.length === 10
    ) {
      var today = new Date().toLocaleString();
      var ID = "NSS" + Date.now();
      DB.ref("Volunteer-Form/" + ID)
        .set({
          ...data,
          ID: ID,
          Timestamp: today,
        })
        .then(() => {
          setAlert(
            "Thank you for Contacting Us!. Your Request is registered with ID: " +
              ID
          );
          setData({
            Email_ID: "",
            Message: "",
            Name: "",
          });
        })
        .catch((error) => {
          setAlert("Error: " + error.message);
        });
    } else {
      setAlert("Please enter valid details");
    }
  };
  return (
    <>
      <h3 className="mb-3">Become a Volunteer</h3>
      {alert && (
        <div
          className="col-12 alert alert-dismissible text-center"
          style={{ color: "rgb(255, 255, 255)" }}
        >
          <strong>{alert}</strong>
        </div>
      )}
      <form className="volunter-form">
        <div className="row">
          <div className="form-group col-md-6 col-12">
            <input
              type="text"
              name="Name"
              onChange={handleChange}
              value={data.Name}
              className="form-control"
              placeholder="Your Name"
            />
          </div>
          <div className="form-group col-md-6 col-12">
            <input
              type="number"
              name="Phone"
              onChange={handleChange}
              value={data.Phone}
              className="form-control"
              placeholder="Your Contact No."
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="Email_ID"
            onChange={handleChange}
            value={data.Email_ID}
            className="form-control"
            placeholder="Your Email"
          />
        </div>
        <div className="form-group">
          <textarea
            name="Message"
            onChange={handleChange}
            value={data.Message}
            cols={30}
            rows={5}
            className="form-control"
            placeholder="Message"
          />
        </div>
        <div className="col-12">
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-white py-3 px-5 float-right"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
