import React from "react";
import { useNavigate } from "react-router-dom";
import DB from "../../../firebase";

export default function Contact() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    Email: "",
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
      data.Email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
      data.Phone.length === 10 &&
      data.Message
    ) {
      var today = new Date().toLocaleString();
      var ID = "NSS" + Date.now();
      DB.ref("Contact-Form/" + ID)
        .set({
          ...data,
          ID: ID,
          TimeStamp: today,
        })
        .then(() => {
          setAlert(
            "Thank you for Contacting Us!. Your Query is registered with Query ID: " +
              ID
          );
          setData({
            Email: "",
            Message: "",
            Name: "",
            Phone: "",
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
    <section className="ftco-section contact-section ftco-degree-bg">
      <div className="container">
        <div className="row d-flex mb-5 contact-info heading-section text-center">
          <div className="col-md-12 mb-4">
            <h2>Contact Us</h2>
            <p>Feel free to Contact Us</p>
          </div>
          <div className="w-100" />
          <div className="col-md-6">
            <p>
              <span>Address:</span> NSS Club, ABES Engineering College Campus -
              1, 19th KM Stone, NH 24, Ghaziabad, Uttar Pradesh 201009
            </p>
          </div>
          <div className="col-md-3">
            <p>
              <span>Email:</span>
              <a href="mailto:nss@abes.ac.in">nss@abes.ac.in</a>
            </p>
          </div>
          <div className="col-md-3">
            <p>
              <span>Website</span>{" "}
              <button onClick={() => navigate("/")}>www.nssabesec.ml</button>
            </p>
          </div>
        </div>
        <div className="row block-9">
          <div className="col-md-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10377.882797425937!2d77.4455685!3d28.6342128!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7c35343eceb7bde0!2sABES%20Engineering%20College!5e1!3m2!1sen!2sin!4v1636888837088!5m2!1sen!2sin"
              width="100%"
              height={450}
              allowFullScreen="no"
              loading="lazy"
              title="Map"
            />
          </div>
          <div className="col-md-6 pr-md-5">
            <h2>Lets Talk</h2>
            {alert && (
              <div
                className="col-12 alert alert-primary alert-dismissible text-center"
                style={{ color: "red" }}
              >
                <strong>{alert}</strong>
                <div id="contactFormAlertText" />
              </div>
            )}
            <form method="post" name="contact-form">
              <div className="row">
                <div className="col-6 form-group">
                  <input
                    type="text"
                    onChange={handleChange}
                    value={data.Name}
                    name="Name"
                    className="form-control"
                    placeholder="Your Name *"
                    required
                  />
                </div>
                <div className="col-6 form-group">
                  <input
                    type="number"
                    name="Phone"
                    onChange={handleChange}
                    value={data.Phone}
                    className="form-control"
                    placeholder="Your Phone Number *"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Email"
                  onChange={handleChange}
                  value={data.Email}
                  className="form-control"
                  placeholder="Enter E-Mail *"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="Message"
                  onChange={handleChange}
                  value={data.Message}
                  cols={30}
                  rows={7}
                  className="form-control"
                  placeholder="Message"
                  defaultValue={""}
                />
              </div>
              <div className="col-12 text-center">
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary py-3 px-5"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
