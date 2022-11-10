firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
  }
})

// Logout Function with Prompt
function logoutwithprompt() {
  Swal.fire({
    icon: 'question',
    title: 'Are you sure you want to logout?',
    showDenyButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: `No`
  }).then((result) => {
    if (result.isConfirmed) {
      firebase.auth().signOut()
    }
  })
}

$(document).ready(function () {
  // setTimeout(function () { $('#kalkritiModel').modal('show'); }, 100);
});

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

// Registration Form
$('#blood-Form').submit(function (e) {
  e.preventDefault();
  // Check Email & Phone
  var Phone = $('#d_contact').val();
  if (Phone.length == 10) {
    submitRegistration();
  }
  else {
    var Alert = document.getElementById('bloodFormAlert');
    AlertText = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Error!</strong> Phone Number must be 10 digits.
    </div>`;
    Alert.innerHTML = AlertText;
  }

});

function submitRegistration() {
  var Alert = document.getElementById('bloodFormAlert');
  var today = new Date().toLocaleString();
  var user = firebase.auth().currentUser;
  if (user.email == 'bdc.1@nssabesec.in') {
    desk = 'Desk 1';
  }
  else if (user.email == 'bdc.2@nssabesec.in') {
    desk = 'Desk 2';
  }
  else if (user.email == 'dh@nssabesec.in') {
    desk = 'Rohit Kumar';
  }
  firebase.database().ref('Blood_Donation').once('value').then(function (snapshot) {
    var ID = "NSS" + (100 + snapshot.numChildren() + 1);
    firebase.database().ref('Blood_Donation/' + ID).set({
      Timestamp: today,
      D_Type: $('#d_type').val(),
      D_Name: $('#d_name').val().toUpperCase(),
      D_ID: $('#d_idno').val().toUpperCase(),
      D_DOB: $('#d_dob').val(),
      D_Gender: $('#d_gender').val(),
      D_BG: $('#d_btype').val().toUpperCase(),
      D_Contact: $('#d_contact').val().toUpperCase(),
      D_Email: $('#d_email').val().toLowerCase(),
      D_Branch: $('#d_branch').val(),
      D_Year: $('#d_year').val(),
      D_Section: $('#d_section').val().toUpperCase(),
      D_Status: 'Registered',
      By: desk
    }).then(() => {
      Toast.fire({ icon: 'success', title: 'Donor Registered.' });
      AlertText = `
    <div class="alert alert-success" role="alert">
        <strong>Success!</strong> Donor Registered Successfully with ID: ${ID}.
    </div>
    `;
      Alert.innerHTML = AlertText;
      $('#blood-Form')[0].reset();

    }).catch((error) => {
      Alert.innerHTML = error.message;
      Alert.style.display = 'block';
    });
  });
}

function typeOnly() {
  if (document.getElementById('d_type').value == 'Faculty / Staff') {
    $('#d_branch').val('Faculty / Staff');
    $('#d_branch').attr('disabled', true);
    $('#d_year').val('Faculty / Staff');
    $('#d_year').attr('disabled', true);
    $('#d_section').val('Faculty / Staff');
    $('#d_section').attr('disabled', true);
  }
  else {
    // Reset Form
    $('#blood-Form')[0].reset();
    $('#d_branch').attr('disabled', false);
    $('#d_year').attr('disabled', false);
    $('#d_section').attr('disabled', false);
    $('#d_type').val('Student');
  }
}

function getDetails() {
  firebase.database().ref('Blood_Donation').on('value', function (snapshot) {
    $('#blooddonationTable').DataTable().destroy();
    document.getElementById("blooddonation-table").innerHTML = "";
    snapshot.forEach(function (getInfo) {
      data = getInfo.val();
      Key = getInfo.key;
      if (data.D_Status == 'Failed') {
        row =
          `<tr>
                    <td>${Key}</td>
                    <td>
                        ${data.D_Type}
                    </td>
                    <td>
                        ${data.D_Name}
                    </td>
                    <td>
                        ${data.D_ID}
                    </td>
                    <td>
                        ${data.D_DOB}
                    </td>
                    <td>
                        ${data.D_Gender}
                    </td>
                    <td>
                      ${data.D_BG}
                    </td>
                    <td>
                    ${data.D_Contact}
                    </td>
                    <td>
                        ${data.D_Branch}/${data.D_Year}/${data.D_Section}
                    </td>
                </tr>`;
        document.getElementById("blooddonation-table").innerHTML += row;
      }
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
          columns: [0, 1, 2, 3,4,5,6,7,8]
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

function updateStatus(id, msg) {
  firebase.database().ref('Blood_Donation/' + id).update({
    D_Status: msg
  });
  Toast.fire({ icon: 'success', title: 'Status Updated Successfully.' });
  getDetails();
}