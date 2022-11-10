getDetails();
function getDetails() {
    firebase.database().ref('Blood_Donation').on('value', function (snapshot) {
        $('#blooddonationTable').DataTable().destroy();
        document.getElementById("blooddonation-table").innerHTML = "";
        snapshot.forEach(function (getInfo) {
            data = getInfo.val();
            Key = getInfo.key;
            row =
                `<tr>
                    <td>${Key}</td>
                    <td>
                        <b>Donor Type: </b>${data.D_Type}<br>
                        <b>Registered On: </b>${data.Timestamp}<br>
                        <b>Status: </b>${data.D_Status}<br>
                    </td>
                    <td>
                        <b>Name : </b>${data.D_Name}<br>
                        <b>Roll No / Emp ID : </b>${data.D_ID}<br>
                        <b>DOB : </b>${data.D_DOB}<br>
                        <b>Gender : </b>${data.D_Gender}<br>
                        <b>Blood Group : </b>${data.D_BG}<br>
                    </td>
                    <td>
                        <b>Branch : </b>${data.D_Branch}<br>
                        <b>Year : </b>${data.D_Year}<br>
                        <b>Section : </b>${data.D_Section}<br>
                        <b>Email ID : </b>${data.D_Email}<br>
                        <b>Contact No : </b>${data.D_Contact}<br>
                        <b>Registered By: </b>${data.By}<br>
                    </td>
                </tr>`;
            document.getElementById("blooddonation-table").innerHTML += row;
        });
        datatableBlood();
    });
}

function datatableBlood() {
    $('#blooddonationTable').DataTable({
        "order": [[0, "desc"]],
        "pageLength": 40,
        dom: 'Bfrtip',
        paging: false,
        destroy: true,
        buttons: [
            {
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3]
                }
            },
            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3]
                }
            },
            {
                extend: 'print',
                exportOptions: {
                    columns: [0, 1, 2, 3]
                }
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3]
                }
            }
        ]
    });
}