//Initialize Function
getContactDetails();
getNewsletterDetails();
getVolunteerDetails();
getMails();

//------------------------------------( Start of Query Functions )------------------------------------//
// Retrive Query Data
function getContactDetails() {
    firebase.database().ref('Contact-Form').on('value', function (snapshot) {
        document.getElementById("contact-table").innerHTML = "";
        var e = 1;
        var pending = 0;
        snapshot.forEach(function (getInfo) {
            info_view = getInfo.val();
            info_id = getInfo.key;
            if (info_view.Status == "Pending") {
                pending++;
            }
            row =
                `<tr>
                <td>${e++}</td>
                <td>${info_view.TimeStamp}</td>
                <td>${info_view.Name}</td>
                <td>${info_view.Email}</td>
                <td>${info_view.Phone}</td>
                <td width="30%">${info_view.Message}</td>
                <td>${info_view.Status}</td>
                <td>
                <span>
                    <a class="table_button" onclick="updataContactStatus('${info_id}')"><i class="fa fa-edit"></i></a>
                    <a class="table_button" onclick="deleteContactData('${info_id}')"><i class="fa fa-trash"></i></a>
                </span>
                </td>
                </tr>`;
            document.getElementById("contact-table").innerHTML += row;
        });
        document.getElementById("pendingQueries").innerHTML = pending;
    });
}

//Initialize Query Datatable
function datatableContact() {
    var status = document.getElementById("contact-datatable").checked;
    if (status == true) {
        $('#contactTable').DataTable({
            "order": [[0, "desc"]],
            "pageLength": 40,
            dom: 'Bfrtip',
            paging: false,
            destroy: true,
            buttons: [
                {
                    extend: 'copyHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                },
                {
                    extend: 'excelHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                },
                {
                    extend: 'print',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                },
                {
                    extend: 'pdfHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                }
            ]
        });
    } else {
        $('#contactTable').DataTable().destroy();
    }
}

//Retrive Query Data for Update
function updataContactStatus(id) {
    let message = prompt("Please Enter Status", "Received");
    var status = document.getElementById("sendMailAlert").checked;
    if (message != null) {
        let msgRef = firebase.database().ref('Contact-Form');
        msgRef.child(id).update({
            "Status": message
        });
        document.getElementById("contact-table").innerHTML = "";
        if (status == true) {
            sendQueryUpdateMail(id);
        }
        getContactDetails();
        Toast.fire({ icon: 'success', title: 'Status Updated Successfully!' });
    }
}

//Delete Query Data
function deleteContactData(id) {
    var B = confirm("Are You Sure You Want to Delete Record?");
    var status = document.getElementById("sendMailAlert").checked;
    if (B == true) {
        if (status == true) {
            sendQueryDeleteMail(id);
        }
        var messagesRef = firebase.database().ref('Contact-Form/' + id);
        messagesRef.remove();
        getContactDetails();
        Toast.fire({ icon: 'success', title: 'Record Deleted Successfully!' })
    }

}

//------------------------------------( End of Query Functions )------------------------------------//

//------------------------------------( Start of Newsletter Functions )------------------------------------//
//Retrive Newsletter Data
function getNewsletterDetails() {
    firebase.database().ref('Newsletter-Form').on('value', function (snapshot) {
        document.getElementById("newsletter-table").innerHTML = "";
        var e = 1;
        snapshot.forEach(function (getInfo) {
            info_view = getInfo.val();
            info_id = getInfo.key;
            row =
                `<tr>
                <td>${e++}</td>
                <td>${info_view.Timestamp}</td>
                <td>${info_view.Name}</td>
                <td>${info_view.Email_ID}</td>
                <td>
                <span>
                    <a class="table_button" onclick="deleteSubscription('${info_id}')"><i class="fa fa-trash"></i></a>
                </span>
                </td>
                </tr>`;
            document.getElementById("newsletter-table").innerHTML += row;
        });
    });
}

//Initiate Newsletter Datatable
function datatableNewsletter() {
    var status = document.getElementById("newsletter-datatable").checked;
    if (status == true) {
        $('#newsletterTable').DataTable({
            "order": [[0, "desc"]],
            "pageLength": 40,
            dom: 'Bfrtip',
            paging: false,
            destroy: true,
            buttons: [
                {
                    extend: 'copyHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                },
                {
                    extend: 'excelHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                },
                {
                    extend: 'print',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                },
                {
                    extend: 'pdfHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                }
            ]
        });
    } else {
        $('#newsletterTable').DataTable().destroy();
    }
}

//Delete Newsletter
function deleteSubscription(id) {
    var B = confirm("Are You Sure You Want to Delete This Subscription?");
    if (B == true) {
        var messagesRef = firebase.database().ref('Newsletter-Form/' + id);
        messagesRef.remove();
        getNewsletterDetails();
        Toast.fire({ icon: 'success', title: 'Record Deleted Successfully!' })
        return;
    }

}

//------------------------------------( End of Newsletter Functions )------------------------------------//

//------------------------------------( Start of Volunteer Functions )------------------------------------//
// Retrive Volunteer Data
function getVolunteerDetails() {
    firebase.database().ref('Volunteer-Form').on('value', function (snapshot) {
        document.getElementById("volunteer-table").innerHTML = "";
        var e = 1;
        snapshot.forEach(function (getInfo) {
            info_view = getInfo.val();
            info_id = getInfo.key;
            row =
                `<tr>
                <td>${e++}</td>
                <td>${info_view.Timestamp}</td>
                <td>${info_view.Name}</td>
                <td>${info_view.Email_ID}</td>
                <td>${info_view.Phone}</td>
                <td width="30%">${info_view.Message}</td>
                <td>${info_view.Status}</td>
                <td>
                <span>
                    <a class="table_button" onclick="whatsappQuery('${info_id}','${info_view.Name}','${info_view.Phone}','${info_view.Message}','${info_view.Status}')"><i class="fa fa-whatsapp"></i></a>
                    <a class="table_button" onclick="updateVRequest('${info_id}')"><i class="fa fa-edit"></i></a>
                </span>
                </td>
                </tr>`;
            document.getElementById("volunteer-table").innerHTML += row;
        });
    });
}

function whatsappQuery(ID, Name, Phone, Message,Update) {
    var Phone = '9084950475';
    var template = `
Dear ${Name},%0A
Thank you for your interest in volunteering with us.%0A%0A
We have Successfully received your Request with Details.%0A
Volunteer ID: ${ID}%0A
Name: ${Name}%0A
Phone: ${Phone}%0A
Message:%0A ${Message}%0A%0A
Response:%0A
${Update}%0A%0A
%0A
We will get back to you soon.%0A
Thank You,%0A
Team - NSS Club (ABESEC)%0A
`;
    window.open(`https://web.whatsapp.com/send?phone=+91${Phone}&text=${template}`);
}

function updateVRequest(ID) {
    var B = confirm("Are You Sure You Want to Update Status?");
    if (B == true) {
        var Update = prompt("Enter Status");
        var msgRef = firebase.database().ref('Volunteer-Form/' + ID);
        msgRef.update({
            Status: Update
        });
        document.getElementById("volunteer-table").innerHTML = "";
        getVolunteerDetails();
        Toast.fire({ icon: 'success', title: 'Status Updated Successfully!' });
    }
}

//Delete Volunteer
// function deleteVolunteer(id) {
//     var B = confirm("Are You Sure You Want to Delete This Form?");
//     if (B == true) {
//         var messagesRef = firebase.database().ref('Volunteer-Form/' + id);
//         messagesRef.remove();
//         getVolunteerDetails();
//         Toast.fire({ icon: 'success', title: 'Record Deleted Successfully!' })
//         return;
//     }

// }

//Initialize Volunteer Datatable
function datatableVolunteer() {
    var status = document.getElementById("volunteer-datatable").checked;
    if (status == true) {
        $('#volunteerTable').DataTable({
            "order": [[0, "desc"]],
            "pageLength": 40,
            dom: 'Bfrtip',
            paging: false,
            destroy: true,
            buttons: [
                {
                    extend: 'copyHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                },
                {
                    extend: 'excelHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                },
                {
                    extend: 'print',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                },
                {
                    extend: 'pdfHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                }
            ]
        });
    } else {
        $('#volunteerTable').DataTable().destroy();
    }
}

//------------------------------------( Start of System Mail Functions )------------------------------------//

// System Mail Attachment
function showAttachmentUpload() {
    if (document.getElementById("include-attachemnt").checked == true) {
        document.getElementById("mail-attachment-div").classList.remove("d-none");
    }
    else {
        document.getElementById("mail-attachment-div").classList.add("d-none");
    }
}
//Get Mails
function getMails() {
    firebase.database().ref('Mailbox').on('value', function (snapshot) {
        document.getElementById("mailbox-table").innerHTML = "";
        var e = 1;
        snapshot.forEach(function (getInfo) {
            info_view = getInfo.val();
            var id = getInfo.key;
            if (info_view.fileurl == "") {
                var attachment_link = "-";
            } else {
                var attachment_link = `<a class="table_button" href="${info_view.fileurl}" target="_blank"><i class="fa fa-link"></a>`
            }
            row =
                `<tr>
                <td>${e++}</td>
                <td>${info_view.TimeStamp}</td>
                <td>${info_view.RTo}</td>
                <td>${info_view.Name}</td>
                <td>${info_view.Subject}</td>
                <td>${info_view.Message}</td>
                <td>${attachment_link}<td>
                <td>
                <a class="table_button" onclick="deleteMail('${id}')"><i class="fa fa-trash"></i></a>
                </td>
                </tr>`;
            document.getElementById("mailbox-table").innerHTML += row;
        });
    });
}

//Insert Mail Data to Database
function insertMail(ID, TimeStamp, RTo, Name, Subject, Message, fileurl) {
    firebase.database().ref('Mailbox/' + ID).set({
        TimeStamp: TimeStamp,
        RTo: RTo,
        Name: Name,
        Subject: Subject,
        Message: Message,
        fileurl: fileurl
    });
    document.getElementById("mail-name").value = "";
    document.getElementById("mail-to").value = "";
    document.getElementById("mail-message").value = "";
    Toast.fire({
        icon: 'success',
        title: 'Record Inserted Successfully!'
    })
    getMails();
}

//Delete Mail Data
function deleteMail(id) {
    var B = confirm("Are You Sure You Want to Delete This Record?");
    if (B == true) {
        let mailRef = firebase.database().ref('Mailbox/' + id);
        mailRef.remove();
        Toast.fire({
            icon: 'success',
            title: 'Record Deleted Successfully!'
        })
        getMails();
    }
}

//------------------------------------( End of System Mail Functions )------------------------------------//


//Send Query Update Email
function sendQueryUpdateMail(ID) {
    firebase.database().ref('Contact-Form/' + ID).once('value').then(function (snapshot) {
        var TimeStamp = snapshot.val().TimeStamp;
        var name = snapshot.val().Name;
        var SEmail = snapshot.val().Email;
        var phone = snapshot.val().Phone;
        var message = snapshot.val().Message;
        var update = snapshot.val().Status;
        var Body =
            `
        <center><img src="https://nssabesec.in/files/mail/header.png" width="100%" alt="Mail Header"></center><br><br><br>
        Dear <b>${name}</b>,<br><br>
        There is a Update on Your Query with  <b>Query ID : ${ID}</b>  [${TimeStamp}] .<br><br>
        Please Note:<br><br>
        <table style="width:100%;border: 1px solid black;border-collapse: collapse;">
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;;width:30%"><b>Query ID</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${ID}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Name</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${name}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Phone No.</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${phone}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Email</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${SEmail}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Message</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${message}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Update</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${update}</td>
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
            Subject: "Regarding Update on Query With Query ID: " + ID,
            Body: Body
        }).then(
            message => {
                console.log(message);
                if (message == 'OK') {
                    console.log('Mail Sent');
                    Toast.fire({ icon: 'success', title: 'Update Mail Send Successfully.' });
                }
                else {
                    console.error(message);
                    Toast.fire({ icon: 'error', title: "Email Send Error" });
                }
            }
        );
    });
}

//Send Query Deletion Mail
function sendQueryDeleteMail(ID) {
    var TimeStamp = new Date().toLocaleString();
    firebase.database().ref('Contact-Form/' + ID).once('value').then(function (snapshot) {
        var name = snapshot.val().Name;
        var SEmail = snapshot.val().Email;
        var phone = snapshot.val().Phone;
        var message = snapshot.val().Message;
        var update = snapshot.val().Status;
        var Body =
            `
        <center><img src="https://nssabesec.in/files/mail/header.png" width="100%" alt="Mail Header"></center><br><br><br>
        Dear <b>${name}</b>,<br><br>
        Your Query with <b> Query ID : ${ID}</b> [${TimeStamp}] has been deleted Successfully.<br><br>

        Please Note:<br><br>
        <table style="width:100%;border: 1px solid black;border-collapse: collapse;">
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;;width:30%"><b>Query ID</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${ID}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Name</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${name}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Phone No.</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${phone}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Email</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${SEmail}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Message</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${message}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Final Update</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${update}</td>
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
            Subject: "Regarding Deletion of Query With Query ID: " + ID,
            Body: Body
        }).then(
            message => {
                console.log(message);
                if (message == 'OK') {
                    console.log('Mail Sent');
                    Toast.fire({ icon: 'success', title: 'Deletion Mail Send Successfully' })
                }
                else {
                    console.error(message);
                    Toast.fire({ icon: 'error', title: 'Email Send Error' })
                }
            }
        );
    });
}

//Send System Mail
function sendSystemMail() {
    var TimeStamp = new Date().toLocaleString();
    var ID = 'NSSMAIL' + Date.now();
    var Name = document.getElementById("mail-name").value || "User";
    var RTo = document.getElementById("mail-to").value;
    var Subject = document.getElementById("mail-subject").value;
    var Message = document.getElementById("mail-message").value;
    var filename = document.getElementById("file-name").value;
    var fileurl = document.getElementById("file-url").value;
    var Body =
        `
        <center><img src="https://nssabesec.in/files/mail/header.png" width="100%" alt="Mail Header"></center><br>
        Dear <b>${Name}</b>,<br><br>
        This is a Communication Mail from Admin -  NSS Club (ABESEC) (nssabesec.in)<br><br>
        Please Note:<br><br>
        <table style="width:100%;border: 1px solid black;border-collapse: collapse;">
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;;width:30%"><b>Timestamp</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${TimeStamp}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Subject</b></td>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;">${Subject}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;border-collapse: collapse;padding: 0.2%;"><b>Message</b></td>
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
        To: RTo,
        From: "info@nssabesec.in",
        Subject: "Mail From Admin - NSS Club (ABESEC) (nssabesec.in)",
        Body: Body,
        Attachments: [
            {
                name: filename || "NSS.png",
                path: fileurl || 'https://nssabesec.in/assets/images/nssabesec.png'
            }]
    }).then(
        message => {
            console.log(message);
            if (message == 'OK') {
                console.log('Mail Sent');
                Toast.fire({ icon: 'success', title: 'Mail Send Successfully' });
                document.getElementById("mail-send-alert").innerHTML = "Mail Send Successfull!";
                document.getElementById("mail-send-alert").style.display = "block";
                insertMail(ID, TimeStamp, RTo, Name, Subject, Message, fileurl);
            }
            else {
                console.error(message);
                Toast.fire({ icon: 'error', title: 'Error' });
            }
        }
    );
}