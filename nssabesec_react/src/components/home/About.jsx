import React from 'react';
import Logo from "../../assets/images/logo/nss.png"

export default function About() {
  return (
    <section className="ftco-section">
    <div className="container">
      <div className="row d-flex">
        <div className="col-md-3 d-flex text-center">
          <img src={Logo} width="100%" alt="logo"/>
        </div>
        <div className="col-md-9 pl-md-5">
          <h2 className="mb-4">Welcome to NSS (National Service Scheme) Club <br /><small>(ABES Engineering College)</small>
          </h2>
          <p>The National Service Scheme (NSS) is an Indian government-sponsored public service program conducted by the
            Department of Youth Affairs and Sports of the Government of India. Popularly known as NSS, the scheme was
            launched in Gandhiji’s Centenary year, 1969. Aimed at developing student’s personality through community
            service, NSS is a voluntary association of young people in Colleges, Universities and at +2 level working
            for a campus-community linkage. <br />
            On the same path, ABESEC has formed NSS Club. The club has a great team of graduating and postgraduate
            students with the support of faculty and management.</p>
        </div>
      </div>
      <div className="">
        <p>In ABES Engineering College, there is a team of 100+ volunteers who encourages other students to
          participate in NSS activities. There are many events and occasions when Government bodies like AICTE, GDA,
          UP govt. Organize events and call colleges to participate. Our college is one of the most active colleges in
          the region who participates with full enthusiasm and spirit.</p>
        <p>Some events which happen round the year are Blood Donation camp, Clothes collection and distribution drive,
          Cancer and heart disease awareness rally and talks, swachhta pakhwada, clean campus day, and many more.</p>
        <div className="text-center">
          <button type="button" className="btn btn-primary m-1">Swachhta Mohua</button>
          <button type="button" className="btn btn-primary m-1">Swachhta Pakhwada</button>
          <button type="button" className="btn btn-primary m-1">Awareness Rally</button>
          <button type="button" className="btn btn-primary m-1">Blood Donation Camp </button>
          <button type="button" className="btn btn-primary m-1">Deepakashta</button>
          <button type="button" className="btn btn-primary m-1">Poster Competition</button>
        </div>
      </div>
    </div>
  </section>

  )
}
