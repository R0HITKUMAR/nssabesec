firebase.auth().onAuthStateChanged((user) => {
  if (user.email == "admin@nssabesec.ml") {
    location.replace("home.html");
  }
});

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
});

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      Toast.fire({ icon: "error", title: error.message });
    });
}

// SignUp Function
// function signUp() {
//     const email = document.getElementById("email").value
//     const password = document.getElementById("password").value
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .catch((error) => {
//             Toast.fire({ icon: 'error', title: error.message });
//         });
// }

// Forget Password Function
// function forgotPass() {
//     var email = prompt("Enter Email:");
//     firebase.auth().sendPasswordResetEmail(email)
//         .then(() => {
//             Toast.fire({ icon: 'success', title: 'Reset link sent to your email id' });
//         })
//         .catch((error) => {
//             Toast.fire({ icon: 'error', title: error.message });
//         });
// }
