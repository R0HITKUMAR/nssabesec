import React from "react";
import DB from "../../../firebase";

export default function Newsletter() {
  const [data, setData] = React.useState({
    email: "",
    name: "",
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
    if (data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && data.name) {
      var today = new Date().toLocaleString();
      var ID = "NSS" + Date.now();
      DB.ref("Newsletter-Form/" + ID)
        .set({
          ID: ID,
          Email_ID: data.email,
          Name: data.name,
          Timestamp: today,
        })
        .then(() => {
          setAlert("Thank you for subscribing to our newsletter!");
          setData({
            email: "",
            name: "",
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
      <h3 className="mb-3">Subscribe Us</h3>
      <div
        className="col-12 alert alert-dismissible text-center"
        style={{ color: "rgb(255, 255, 255)" }}
      >
        <strong>{alert}</strong>
      </div>
      <form
        method="post"
        autoComplete="off"
        name="newsletter-form"
        className="volunter-form"
        id="newsletter-Form"
      >
        <div className="row">
          <div className="form-group col-md-3 col-12">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={data.name}
              className="form-control"
              placeholder="Your Name"
            />
          </div>
          <div className="form-group col-md-7 col-12">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={data.email}
              className="form-control"
              placeholder="Your Email"
            />
          </div>
          <div
            className="form-group col-md-2 col-12 text-center"
            style={{ float: "right !important" }}
          >
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-white py-3 px-5"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
