$(document).ready(function () {
  setTimeout(function () { $('#kalkritiModel').modal('show'); }, 100);
});

// Body Load Event
uploadTimer();

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

// IP Address
$.getJSON('https://api.ipify.org?format=json', function (data) {
  document.getElementById("c_ip").value = data.ip;
});

// Timer Management & Section Management
var regTime = new Date("Jan 20, 2022 00:00:00").getTime();
var uploadTime = new Date("Jan 25, 2022 00:00:00").getTime();
var endTime = new Date("Jan 27, 2022 00:00:00").getTime();
var currentTime = new Date().getTime();
if (currentTime >= regTime && currentTime < uploadTime) {
  document.getElementById("timer-status").innerHTML = "Registration Ends  : ";
  timer(uploadTime);
}
else if (currentTime < regTime) {
  document.getElementById("timer-status").innerHTML = "Registration Starts  : ";
  timer(regTime);
}
else if (currentTime >= uploadTime && currentTime < endTime) {
  document.getElementById("timer-status").innerHTML = "Poster Submission Ends  : ";
  timer(endTime);

}
else {
  document.getElementById("timer-status").classList.add("d-none");
  document.getElementById("timer-update").innerHTML = "Registration Ends";
}

function timer(countDownDate) {
  var x = setInterval(function () {
    var now = new Date().getTime();
    var remaining_time = countDownDate - now;
    var days = Math.floor(remaining_time / (1000 * 60 * 60 * 24));
    var hours = Math.floor((remaining_time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((remaining_time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remaining_time % (1000 * 60)) / 1000);

    document.getElementById("timer-update").innerHTML = days + " Day " + hours + " Hours "
      + minutes + " Minutes " + seconds + " Second ";
    if (remaining_time < 0) {
      clearInterval(x);
    }
  }, 1000);
}

//Button Click Event
function loadForm() {
  if (currentTime >= regTime && currentTime < uploadTime) {
    registration();
    Toast.fire({ icon: 'success', title: 'Registration Form. Scroll Down to Register' });
  }
  else if (currentTime >= uploadTime && currentTime < endTime) {
    uploadPoster();
    Toast.fire({ icon: 'success', title: 'Poster Submission Form. Scroll Down to Submit Poster' });
  }
  else if (currentTime < regTime) {
    Swal.fire({
      icon: 'error',
      text: 'Sorry..',
      title: 'Registration Starting Soon',
      footer: '<a href="https://instagram.com/nss_abesec"> Follow us on Instagram</a>'
    })
  }
  else {
    Swal.fire({
      icon: 'error',
      text: 'Sorry..',
      title: 'Registration Ends',
      footer: '<a href="https://instagram.com/nss_abesec">Go to Instagram</a>'
    })
  }
}


function uploadTimer() {
  var countDownDate = new Date("Jan 25, 2022 00:00:00").getTime();
  var x = setInterval(function () {
    var now = new Date().getTime();
    var remaining_time = countDownDate - now;
    var days = Math.floor(remaining_time / (1000 * 60 * 60 * 24));
    var hours = Math.floor((remaining_time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((remaining_time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remaining_time % (1000 * 60)) / 1000);
    document.getElementById("poster_time").innerHTML = days + " Day " + hours + " Hours "
      + minutes + " Minutes " + seconds + " Second ";
    if (remaining_time < 0) {
      clearInterval(x);
    }
  }, 1000);
}

function loadButtons() {
  document.getElementById("dev_button").classList.remove("d-none");
}
function registration() {
  document.getElementById("about-section").classList.add("d-none");
  document.getElementById("about-section").classList.add("d-none");
  document.getElementById("poster-upload").classList.add("d-none");
  document.getElementById("registration").classList.remove("d-none");
}

function uploadPoster() {
  document.getElementById("about-section").classList.add("d-none");
  document.getElementById("about-section").classList.add("d-none");
  document.getElementById("registration").classList.add("d-none");
  document.getElementById("poster-upload").classList.remove("d-none");
}

// Registration Form
$('#kalakriti-Form').submit(function (e) {
  e.preventDefault();
  var today = new Date().toLocaleString();
  var ID = 'NSSKID' + Date.now();
  firebase.database().ref('Kalakriti2K22/' + ID).set({
    Timestamp: today,
    IP: $('#c_ip').val(),
    Name: $('#c_name').val(),
    Admission_No: $('#c_adno').val(),
    BY: $('#c_by').val(),
    Email: $('#c_email').val(),
    Phone: $('#c_cno').val(),
    Insta: $('#c_insta').val(),
    PT: $('#c_ptitle').val(),
    URL: "Not Uploaded",
  });
  sendRegistrationMail(ID);
  $('#kalakriti-Form')[0].reset();
  Toast.fire({ icon: 'success', title: 'Thanks for Registering for KalaKriti 2K22.' });
  document.getElementById('kalakriti-Form').style.display = 'none';
  document.getElementById("kalakritiFormAlert").innerHTML = "Thanks For Registering in KalaKriti 2K22 organized by NSS Club (ABES Engineering College)<br>Your Kalakriti ID : <b>" + ID + "</b><br>You will also receive a reference mail for the same.<br>Please check Your Spam Folder if you don't receive the mail.<br>Please Submit Poster between January 25, 2022 to January 26, 2022";
  document.getElementById("kalakritiFormAlert").classList.remove("d-none");
});

// Details Search Function
function retrievdata() {
  document.getElementById("kalakritiPosterFormAlert").classList.add("d-none");
  var ID = document.getElementById("kalakritiPosterId").value;
  let kRef = firebase.database().ref('Kalakriti2K22/' + ID);
  kRef.on('value', function (snapshot) {
    data = snapshot.val();
    if (data == null) {
      Toast.fire({ icon: 'error', title: 'No Data Found!' });
      document.getElementById("kalakritiPosterFormAlert").innerHTML = "No Registration found for the given ID.";
      document.getElementById("kalakritiPosterFormAlert").classList.remove("d-none");
    } else {
      if (data.URL == "Not Uploaded") {
        Toast.fire({ icon: 'success', title: 'Record Found!' });
        document.getElementById("kalakritiPosterId").readOnly = true;
        document.getElementById("posterUpload-Form").classList.remove("d-none");
        document.getElementById('k_timestamp').value = data.Timestamp;
        document.getElementById('k_ip').value = data.IP;
        document.getElementById('r_name').innerHTML = data.Name;
        document.getElementById('k_name').value = data.Name;
        document.getElementById('k_adno').value = data.Admission_No;
        document.getElementById('k_by').value = data.BY;
        document.getElementById('k_email').value = data.Email;
        document.getElementById('k_cno').value = data.Phone;
        document.getElementById('k_insta').value = data.Insta;
        document.getElementById('k_ptitle').value = data.PT;
      }
      else {
        Toast.fire({ icon: 'error', title: 'Poster Alredy Uploaded!' });
        var alredyuploaded = `
        <div class="row" id="alredyuploaded">
            <div class="col-md-4 col-12 mb-5">
              <img src="${data.URL}" class="img-fluid" alt="Responsive image">
            </div>
            <div class="col-md-8 col-12 row">
              <h1>Poster Alredy Uploaded<br>Received Details</h1>
              <span>Dear ${data.Name}, Your Posters is alredy Uploaded. Please Note:</span>
              <div class="col-6">
                <p class="received-details">
                    ID<br>
                    Name<br>
                    Admission No<br>
                    Branch & Year<br>
                    Email Address<br>
                    Contact No.<br>
                    Instagram User Name<br>
                </p>  
              </div>
              <div class="col-6">
                <p class="received-details">
                    ${ID}<br>
                    ${data.Name}<br>
                    ${data.Admission_No}<br>
                    ${data.BY}<br>
                    ${data.Email}<br>
                    ${data.Phone}<br>
                    ${data.Insta}<br>
                </p>  
              </div>
            </div>
            <h1>Thanks for Participating. Stay Safe & Healthy</h1>
        </div>`;
        document.getElementById("kalakritiPosterFormAlert").innerHTML = alredyuploaded;
        document.getElementById("kalakritiPosterFormAlert").classList.remove("d-none");
      }
    }
  });
}

// Poster Upload Functions
function posterUpload() {
  var file = document.getElementById("p_file").files[0];
  var ID = document.getElementById("kalakritiPosterId").value;
  var storageRef = firebase.storage().ref('Kalakriti2K22/' + ID + file.name);
  var task = storageRef.put(file);
  task.on('state_changed',
    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById('progressBarC').classList.remove("d-none");
      document.getElementById('progressBar').value = percentage;
      console.log(percentage);
    }
  );
  task.then(function (snapshot) {
    document.getElementById("kalakritiPosterFormAlert").classList.add("d-none");
    console.log('Poster Upload Successfully');
    document.getElementById('progressBarC').classList.add("d-none");
    storageRef
      .getDownloadURL()
      .then(function (url) {
        console.log(url);
        document.getElementById("poster_upload").disabled = true;
        document.getElementById("p_file").disabled = true;
        Toast.fire({ icon: 'success', title: 'Poster Uploaded Successfully' });
        document.getElementById("kalakritiPosterFormAlertText").innerHTML = `<span style="float:left">Poster Uploaded Successfully</span>` + `<a href="${url}" class="btn btn-primary btn-sm text-light" target="_blank" style="float:right">View [${file.name}]</a>` + `<br>`;
        document.getElementById("poster_url").value = url;
        document.getElementById("kalakritiPosterFormAlertText").classList.remove("d-none");
        document.getElementById("posterUploadForm").classList.remove("d-none");
        Swal.fire('Click Submit Button to Submit the Poster');
      })
      .catch(function (error) {
        console.log("error encountered");
      });
  }
  );
}

// Submit Poster Function
function updatePoster() {
  Swal.fire({
    title: 'Are you sure?',
    text: "Are you want to Submit the Poster?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      var today = new Date().toLocaleString();
      var url = document.getElementById("poster_url").value;
      var ID = document.getElementById("kalakritiPosterId").value;
      let msgRef = firebase.database().ref('Kalakriti2K22/');
      msgRef.child(ID).update({
        S_Timestamp: today,
        URL: url

      });
      Toast.fire({ icon: 'success', title: 'Thanks for Participating in KalaKriti 2K22!' });
      document.getElementById("kalakritiPosterFormAlert").innerHTML = `
      Thanks for Participating in KalaKriti 2K22<br>Your Poster is Submitted Successfully<br>
      `;
      sendSubmissionMail(ID);
      document.getElementById("posterUpload-Form").classList.add("d-none");
      document.getElementById("kalakritiPosterFormAlert").classList.remove("d-none");
    }
    else {
      Swal.fire(
        'Please Upload Poster!',
        'Please upload a valid Poster',
        'error'
      )
      document.getElementById("kalakritiPosterFormAlert").innerHTML = `Please Upload Poster`;
      document.getElementById("kalakritiPosterFormAlert").classList.remove("d-none");
    }
  })
}



// Registration Mail Send
function sendRegistrationMail(ID) {
  firebase.database().ref('Kalakriti2K22/' + ID).once('value').then(function (snapshot) {
    var Timestamp = snapshot.val().Timestamp;
    var name = snapshot.val().Name;
    var SEmail = snapshot.val().Email;
    var BY = snapshot.val().BY;
    var phone = snapshot.val().Phone;
    var insta = snapshot.val().Insta;
    var adno = snapshot.val().Admission_No;
    console.log(ID, Timestamp, name, SEmail, BY, phone, insta, adno);
    var Body =
      `
      <center><img src="https://kalakriti.nssabesec.in/files/kalakriti2k22/header.png" width="100%" alt="Mail Header"></center><br><br><br>
      Dear <b>${name}</b>,<br><br>
      Thanks for Registering in KalaKriti 2K22<br><br>
      Your KalaKriti ID : <b>${ID}</b> on [${Timestamp}] .<br><br>
  
      Please Note:<br><br>
      <table style="width:100%;border: 1px solid black;border-collapse: collapse;">
          <tr>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;;width:30%"><b>KalaKriti ID</b></td>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${ID}</td>
          </tr>
          <tr>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Name</b></td>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${name}</td>
          </tr>
          <tr>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Admission No.</b></td>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${adno}</td>
          </tr>
          <tr>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Branch & Year</b></td>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${BY}</td>
          </tr>
          <tr>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Contact No.</b></td>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${phone}</td>
          </tr>
          <tr>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Email</b></td>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${SEmail}</td>
          </tr>
          <tr>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Instagram User Name</b></td>
              <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${insta}</td>
          </tr>
      </table><br>
      Please follow the Rules mentioned below:<br>
      <ul>
          <li>Only Registered Candidates can Submit their Poster</li>
          <li>All Poster will be in png Format with Frame Size of 1:1 (Square)</li>
          <li>Candidate can create their Posters using Tools available like Canva etc</li>
          <li>Candidates Must Require an Unique Kalakriti ID for Poster Submission which was issue on Registration and attached in this Mail.</li>
          <li>Just Enter Your Kalakriti ID in Search Box then Search</li>
          <li>You must be following @nss_abesec Instagram Page.</li>
          <li>Get as many genuine likes as possible to win the contest.</li>
          <li>Tag 5 friends in comment section when your Poster get uploaded on the Page and ask them to follow our Page.</li>
          <li>People using <b>Unfair Means (UFM)</b> will be automatically disqualified without any Prior Notice.</li>
          <li>Top 3 Winning Candidates gets wild Card Entry in Reputated NSS Club (ABESEC)</li>
          <li>Poster Submission Starts from January 25, 2022 to January 26, 2022.</li>
          <li>Visit our Instagram Page for more Updates.</li>
      </ul><br>
      In case of any query, Please fill Contact/Query Form available at <a href="https://nssabesec.in">NSS ABESEC Website</a>
      <br><br>
      <b>Thanks & Regards,</b><br>
      <b>Team - NSS Club (ABES Engineering College)</b><br>
      <hr width=100%>
      <small><b>Disclaimer:</b> This is a system generated e-mail and please do not reply. Add info@nssabesec.in to
          your white list / safe sender list. Else, your mailbox filter or ISP (Internet Service Provider) may stop you
          from receiving e-mails.</small><br><br><br>
          <center><img src="https://kalakriti.nssabesec.in/files/footer.png" width="100%" alt="Mail Header"></center> `;
    Email.send({
      SecureToken: "dc3846a1-5456-4a7b-9882-94316786ce4f",
      To: SEmail,
      From: "info@nssabesec.in",
      Subject: "Thanks for Registering in KalaKriti 2K22. Your KalaKriti ID :" + ID,
      Body: Body,
      Attachments: [
        {
          name: "KalaKriti2K22.pdf",
          path: "https://kalakriti.nssabesec.in/files/KalaKriti2K22.pdf"
        }]
    }).then(
      message => {
        console.log(message);
        if (message == 'OK') {
          console.log('Mail Sent');
          Toast.fire({ icon: 'success', title: 'You Will Receive Mail Soon.' });
        }
        else {
          console.error(message);
          Toast.fire({ icon: 'error', title: "Please Note this ID." });
        }
      }
    );
  });
}

function sendSubmissionMail(ID) {
  firebase.database().ref('Kalakriti2K22/' + ID).once('value').then(function (snapshot) {
    var Timestamp = snapshot.val().Timestamp;
    var name = snapshot.val().Name;
    var SEmail = snapshot.val().Email;
    var BY = snapshot.val().BY;
    var phone = snapshot.val().Phone;
    var insta = snapshot.val().Insta;
    var adno = snapshot.val().Admission_No;
    var url = snapshot.val().URL;
    console.log(ID, Timestamp, name, SEmail, BY, phone, insta, adno);
    var Body =
      `
      <center><img src="https://kalakriti.nssabesec.in/files/header.png" width="100%" alt="Mail Header"></center><br><br><br>
      <center>Thanks for Participating in KalaKriti 2K22</center>
      Dear <b>${name}</b>,<br><br>
      We have received your Poster with  KalaKriti ID : <b>${ID}</b>.<br><br>
      <center><img src="${url}" width="80%" alt="Upload Poster"></center><br>
      Please Note that:<br>
      <ul>
          <li>You must be following @nss_abesec Instagram Page.</li>
          <li>Get as many genuine likes as possible to win the contest.</li>
          <li>Tag 5 friends in comment section when your Poster get uploaded on the Page and ask them to follow our Page.</li>
          <li>People using <b>Unfair Means (UFM)</b> will be automatically disqualified without any Prior Notice.</li>
          <li>Top 3 Winning Candidates gets wild Card Entry in Reputated NSS Club (ABESEC)</li>
          <li>Voting or Likes starts from January 27, 2022 to January 30, 2022</li>
          <li>Stay Tuned for Results to be announced on February 01, 2022.</li>
          <li>Visit our Instagram Page for more Updates.</li>
      </ul><br>
      In case of any query, Please fill Contact/Query Form available at <a href="https://nssabesec.in">NSS ABESEC Website</a>
      <br><br>
      <b>Thanks & Regards,</b><br>
      <b>Team - NSS Club (ABES Engineering College)</b><br>
      <hr width=100%>
      <small><b>Disclaimer:</b> This is a system generated e-mail and please do not reply. Add info@nssabesec.in to
          your white list / safe sender list. Else, your mailbox filter or ISP (Internet Service Provider) may stop you
          from receiving e-mails.</small><br><br><br>
          <center><img src="https://kalakriti.nssabesec.in/files/footer.png" width="100%" alt="Mail Header"></center> `;

    Email.send({
      SecureToken: "dc3846a1-5456-4a7b-9882-94316786ce4f",
      To: SEmail,
      From: "info@nssabesec.in",
      Subject: "Thanks for Registering in KalaKriti 2K22. We have Received Your Poster",
      Body: Body,
      Attachments: [
        {
          name: "KalaKriti2K22.pdf",
          path: "https://kalakriti.nssabesec.in/files/KalaKriti2K22.pdf"
        }]
    }).then(
      message => {
        console.log(message);
        if (message == 'OK') {
          console.log('Mail Sent');
          Toast.fire({ icon: 'success', title: 'You Will Receive Mail Soon.' });
        }
        else {
          console.error(message);
          Toast.fire({ icon: 'error', title: "Please Note this ID." });
        }
      }
    );
  });
}