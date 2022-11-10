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

//-------------------------------------( Start of Form Functions)------------------------------------//

$('#contact-Form').submit(function (e) {
    e.preventDefault();
    var today = new Date().toLocaleString();
    var ID = 'NSSQ' + Date.now();
    firebase.database().ref('Contact-Form/' + ID).set({
        Name: $('#name').val(),
        Email: $('#email').val(),
        Phone: $('#phone').val(),
        Message: $('#message').val(),
        TimeStamp: today,
        Status: "Pending"
    });
    sendContactMail(ID);
    $('#contact-Form')[0].reset();
    Toast.fire({ icon: 'success', title: 'Thanks for Contacting Me.' });
    document.getElementById('contact-Form').style.display = 'none';
    document.getElementById("contactFormAlertText").innerHTML = "Thanks For Contacting Us<br>Your Query is Registered with Query ID: <b>" + ID + "</b><br>You will also receive a reference mail for the same.<br>Please check Your Spam Folder if you don't receive the mail.";
    document.getElementById("contactFormAlert").style.display = "block";
});

$('#newsletter-Form').submit(function (e) {
    e.preventDefault();
    var today = new Date().toLocaleString();
    var ID = 'NSSN' + Date.now();
    firebase.database().ref('Newsletter-Form/' + ID).set({
        Name: $('#nname').val(),
        Email_ID: $('#nemail').val(),
        Timestamp: today
    });
    sendSubscriptionMail(ID);
    $('#newsletter-Form')[0].reset();
    document.getElementById('newsletter-Form').style.display = 'none';
    Toast.fire({ icon: 'success', title: 'Subscribed Successfully!' });
    document.getElementById("newsletterFormAlertText").innerHTML = "<b>Subscribed Successfully!</b><br>Your Subscription is Registered with Subscribed ID: <b>" + ID + "</b><br>You will also receive a reference mail for the same.<br>Please check Your Spam Folder if you don't receive the mail.";
    document.getElementById("newsletterFormAlert").style.display = "block";
});

$('#volunteer-Form').submit(function (e) {
    e.preventDefault();
    var today = new Date().toLocaleString();
    var ID = 'NSSV' + Date.now();
    firebase.database().ref('Volunteer-Form/' + ID).set({
        Name: $('#vname').val(),
        Phone: $('#vphone').val(),
        Email_ID: $('#vemail').val(),
        Message: $('#vmessage').val(),
        Timestamp: today,
        Status: "Pending"
    });
    sendVolunteerMail(ID);
    $('#volunteer-Form')[0].reset();
    document.getElementById('volunteer-Form').style.display = 'none';
    Toast.fire({ icon: 'success', title: 'Subscribed Successfully!' });
    document.getElementById("volunteerFormAlertText").innerHTML = "<b>Thanks for applying for Volunteer</b><br>Your Request is Registered with Volunteer ID: <b>" + ID + "</b><br>You will also receive a reference mail for the same shortly.<br>Please check Your Spam Folder if you don't receive the mail.";
    document.getElementById("volunteerFormAlert").style.display = "block";
});

//-------------------------------------( End of Form Functions)------------------------------------//


//-------------------------------------( Start of Mail Functions)------------------------------------//

function sendContactMail(ID) {
    var today = new Date().toLocaleString();
    var Name = $('#name').val();
    var SEmail = $('#email').val();
    var Phone = $('#phone').val();
    var Message = $('#message').val();
    var TimeStamp = today;
    var Body = ` 
    <center><img src="https://nssabesec.in/files/mail/header.png" width="100%" alt="Mail Header"></center>
    <center><img src="https://nssabesec.in/files/mail/contact.png" width="50%"></center><br><br>
    Dear <b>${Name}</b>,<br><br>
    Your Query has been registered Successfully. Your Query ID is <b>${ID}</b> at [${TimeStamp}].<br>
    Please use this Query ID for futher Support.<br><br>

    Please Note:<br><br>
    <table style="width:100%;border: 1px solid black;border-collapse: collapse;">
        <tr>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;width:30%"><br>Query ID<br></td>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${ID}</td>
        </tr>
        <tr>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><br>Name<br></td>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${Name}</td>
        </tr>
        <tr>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><br>Phone No.<br></td>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${Phone}</td>
        </tr>
        <tr>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><br>Email<br></td>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${SEmail}</td>
        </tr>
        <tr>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><br>Message<br></td>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${Message}</td>
        </tr>
    </table>
    <br><br>
    <b>Thanks & Regards,</b><br>
    <b>Team - NSS Club (ABES Engineering College)</b><br>
    <hr width=100%>
    <small><b>Disclaimer:</b> This is a system generated e-mail and please do not reply. Add info@nssabesec.in to
    your white list / safe sender list. Else, your mailbox filter or ISP (Internet Service Provider) may stop you
    from receiving e-mails.</small><br><br><br>
    <center><img src="https://nssabesec.in/files/mail/footer.png" width="100%" alt="Mail Header"></center> `;

    Email.send({
        SecureToken: "dc3846a1-5456-4a7b-9882-94316786ce4f",
        To: SEmail,
        From: "info@nssabesec.in",
        Subject: "Contact Query Registered With Query ID: " + ID,
        Body: Body
    }).then(
        message => {
            console.log(message);
            if (message == 'OK') {
                console.log('Mail Sent');
                // Toast.fire({icon: 'success',title: 'Mail Send Successfully!' })
            }
            else {
                console.error(message);
                // Toast.fire({ icon: 'error', title: message })
            }
        }
    );
}


function sendSubscriptionMail(ID) {
    var Name = $('#nname').val();
    var SEmail = $('#nemail').val();
    var Body =
        `
    <center><img src="https://nssabesec.in/files/mail/header.png" width="100%" alt="Mail Header"></center>
    <center>
    <img src="https://nssabesec.in/files/mail/subscription.jpg" width="100%">
    <h1>Thanks for Subscribing Us.</h1></center>
    Dear <b>${Name}</b>,<br><br>
    You have been Subscribed Successfully. Your Subscription ID is <b>${ID}</b>.<br>
    You will Receive our Newsletter Soon.
    <br><br>
    <b>Thanks & Regards,</b><br>
    <b>Team - NSS Club (ABES Engineering College)</b><br>
    <hr width=100%>
    <small><b>Disclaimer:</b> This is a system generated e-mail and please do not reply. Add info@nssabesec.in to
    your white list / safe sender list. Else, your mailbox filter or ISP (Internet Service Provider) may stop you
    from receiving e-mails.</small><br><br><br>
    <center><img src="https://nssabesec.in/files/kalakriti2k22/footer.png" width="100%" alt="Mail Header"></center> `;
    Email.send({
        SecureToken: "dc3846a1-5456-4a7b-9882-94316786ce4f",
        To: SEmail,
        From: "info@nssabesec.in",
        Subject: "Thanks for Subscribing Us.",
        Body: Body
    }).then(
        message => {
            console.log(message);
            if (message == 'OK') {
                console.log('Mail Sent');
                // Toast.fire({ icon: 'success', title: 'Mail Send Successfully' });
            }
            else {
                console.error(message);
                // Toast.fire({ icon: 'error', title: "Email Send Error" });
            }
        }
    );
}

function sendVolunteerMail(ID) {
    var Name = $('#vname').val();
    var SEmail = $('#vemail').val();
    var Phone = $('#vphone').val();
    var Body = ` 
    <center><img src="https://nssabesec.in/files/mail/header.png" width="100%" alt="Mail Header"></center>
    Dear <b>${Name}</b>,<br><br>
    Your Request has been registered Successfully. Your Volunteer ID is <b>${ID}</b>.<br>

    Please Note:<br><br>
    <table style="width:100%;border: 1px solid black;border-collapse: collapse;">
        <tr>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;width:30%"><b>Volunteer ID</b></td>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${ID}</td>
        </tr>
        <tr>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Name</b><</b>/td>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${Name}</td>
        </tr>
        <tr>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Phone No.</b></td>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${Phone}</td>
        </tr>
        <tr>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Email</b></td>
            <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${SEmail}</td>
        </tr>
    </table><br>
    You will Receive communication Mail Soon.
    <br><br>
    <b>Thanks & Regards,</b><br>
    <b>Team - NSS Club (ABES Engineering College)</b><br>
    <hr width=100%>
    <small><b>Disclaimer:</b> This is a system generated e-mail and please do not reply. Add info@nssabesec.in to
    your white list / safe sender list. Else, your mailbox filter or ISP (Internet Service Provider) may stop you
    from receiving e-mails.</small><br><br><br>
    <center><img src="https://nssabesec.in/files/mail/footer.png" width="100%" alt="Mail Header"></center> `;
    Email.send({
        SecureToken: "dc3846a1-5456-4a7b-9882-94316786ce4f",
        To: SEmail,
        From: "info@nssabesec.in",
        Subject: "Volunteer Registered with Volunteer ID: " + ID,
        Body: Body
    }).then(
        message => {
            console.log(message);
            if (message == 'OK') {
                console.log('Mail Sent');
                // Toast.fire({icon: 'success',title: 'Mail Send Successfully!' })
            }
            else {
                console.error(message);
                // Toast.fire({ icon: 'error', title: message })
            }
        }
    );
}

// Popup Functions
firebase.database().ref('Popup').on('value', function (snapshot) {
    var data = snapshot.val();
    if (data.image != "https://www.nssabesec.in/assets/images/bg/bg-2.jpg") {
        document.getElementById('popup-image').src = data.image;
    }
    if (data.text != "Welcome to NSS Club (ABESEC) Website") {
        document.getElementById('popup-text').innerHTML = data.text;
    }
    document.getElementById('recentupdates').innerHTML = data.update;
});

