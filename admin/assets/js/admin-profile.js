firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        location.replace("index.html")
    }
    document.getElementById("User-Email1").value = user.email
    document.getElementById("new-name").value = user.displayName
    document.getElementById("new-phone").value = user.photoURL
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

function logout() {
    firebase.auth().signOut()
}

// Change Password Function
function changePass() {
    document.getElementById("changePassButton").disabled = true;
    document.getElementById("changePassButton").value = 'Loading..';
    const user = firebase.auth().currentUser;
    const newPassword = document.getElementById("new-password").value;

    user.updatePassword(newPassword).then(() => {
        Toast.fire({ icon: 'success', title: 'Password Updated Successfully!' });
        document.getElementById("changePassButton").value = 'Successful';
        setTimeout(logout, 5000)

    }).catch((error) => {
        document.getElementById("changePassButton").value = 'Try Again';
        Toast.fire({ icon: 'error', title: error.message });
    });
}

// Delete Profile Function
function deleteprofile() {
    var A = confirm("Are you sure you want to delete your profile?");
    if (A == true) {
        document.getElementById("deleteprofileButton").disabled = true;
        document.getElementById("deleteprofileButton").value = 'Loading..';
        const user = firebase.auth().currentUser;
        user.delete().then(() => {
            Toast.fire({ icon: 'success', title: 'Profile Deleted Successfully!' });
            document.getElementById("deleteprofileButton").value = 'Successful';
            alert("Profile Deleted Successfully")
        }).catch((error) => {
            Toast.fire({ icon: 'error', title: error.message });
            document.getElementById("deleteprofileButton").value = 'Try Again';
        });
    }

}

// Update Email Function
function updateemail() {
    document.getElementById("updateemailButton").disabled = true;
    document.getElementById("updateemailButton").value = 'Loading..';
    const user = firebase.auth().currentUser;
    const email = document.getElementById("newemail").value
    if (email == "") {
        Toast.fire({ icon: 'error', title: 'Please Enter a Valid Email ID' });
        return false;
    }
    user.updateEmail(email).then(() => {
        Toast.fire({ icon: 'success', title: 'Email Updated Successfully!' });
        window.setTimeout(function () { location.reload() }, 3000)
    }).catch((error) => {
        Toast.fire({ icon: 'error', title: error.message });
    });
}

// Update Name Function
function updatename() {
    document.getElementById("updatenameButton").disabled = true;
    document.getElementById("updatenameButton").value = 'Loading..';
    const user = firebase.auth().currentUser;
    const name = document.getElementById("new-name").value
    if (name == "") {
        Toast.fire({ icon: 'error', title: 'Please Enter a Valid Name' });
        return false;
    }
    user.updateProfile({
        displayName: name
    }).then(() => {
        Toast.fire({ icon: 'success', title: 'Name Updated Successfully!' });
    }).catch((error) => {
        Toast.fire({ icon: 'error', title: error.message });
    });
}

//Update Phone No
function updatephone() {
    document.getElementById("updatephoneButton").disabled = true;
    document.getElementById("updatephoneButton").value = 'Loading..';
    const user = firebase.auth().currentUser;
    const phone = document.getElementById("new-phone").value
    if (phone == "") {
        Toast.fire({ icon: 'error', title: 'Please Enter a Valid Phone Number' });
        return false;
    }
    user.updateProfile({
        photoURL: phone
    }).then(() => {
        Toast.fire({ icon: 'success', title: 'Phone Number Updated Successfully!' });
    }).catch((error) => {
        Toast.fire({ icon: 'error', title: error.message });
    });
}

//Popup Functions
firebase.database().ref('Popup').on('value', function (snapshot) {
    var data = snapshot.val();
    document.getElementById('popuptext').value = data.text;
    document.getElementById('latestupdate').value = data.update;
});

function updatePopupText() {
    var text = document.getElementById('popuptext').value;
    firebase.database().ref('Popup').update({
        text: text
    });
    Toast.fire({ icon: 'success', title: 'Updated Successfully!' });
}

function latestUpdate() {
    var text = document.getElementById('latestupdate').value;
    firebase.database().ref('Popup').update({
        update: text
    });
    Toast.fire({ icon: 'success', title: 'Updated Successfully!' });
}

function defaultUpdates() {
    firebase.database().ref('Popup').update({
        update: "No Recent Updates"
    });
    Toast.fire({ icon: 'success', title: 'Updated Successfully!' });

}
function defaultImage() {
    firebase.database().ref('Popup').update({
        image: "https://www.nssabesec.in/assets/images/bg/bg-2.jpg"
    });
    Toast.fire({ icon: 'success', title: 'Updated Successfully!' });

}
function defaultTitle() {
    firebase.database().ref('Popup').update({
        text: "Welcome to NSS Club (ABESEC) Website"
    });
    Toast.fire({ icon: 'success', title: 'Updated Successfully!' });

}