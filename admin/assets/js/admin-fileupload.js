function mailAttachmemtFileUpload() {
    var file = document.getElementById("mail-attachment").files[0];
    var storageRef = firebase.storage().ref('Mail-Attachments/' + file.name);
    var task = storageRef.put(file);
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percentage);
        }
    );
    task.then(function (snapshot) {
        document.getElementById("fileuploaddiv").classList.add("d-none");
        document.getElementById("file-name").value = file.name;
        console.log('File Upload Successfully');
        storageRef
            .getDownloadURL()
            .then(function (url) {
                console.log(url);
                Toast.fire({ icon: 'success', title: 'File Uploaded Successfully' });
                document.getElementById("mail-send-alert").innerHTML = `<span style="float:left">File Uploaded Successfully</span>` + `<a href="${url}" class="btn btn-primary btn-sm" target="_blank" style="float:right">View [${file.name}</a>` + `<br>`;
                document.getElementById("mail-send-alert").style.display = "block";
                document.getElementById("file-url").value = url;
            })
            .catch(function (error) {
                console.log("error encountered");
            });
    }
    );

}

function commonFileUpload() {
    var refR = document.getElementById('defref-div').value;
    var file = document.getElementById("common-file").files[0];
    var storageRef = firebase.storage().ref(refR + '/' + file.name);
    var task = storageRef.put(file);
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percentage);
        }
    );
    task.then(function (snapshot) {
        console.log('File Upload Successfully');
        storageRef
            .getDownloadURL()
            .then(function (url) {
                console.log(url);
                document.getElementById("commonfilealert").innerHTML = `<span style="float:left">File Uploaded Successfully</span>` + `<a href="${url}" class="btn btn-primary btn-sm" target="_blank" style="float:right">View [${file.name}]</a>` + `<br>`;
                Toast.fire({ icon: 'success', title: 'File Uploaded Successfully' });
            })
            .catch(function (error) {
                console.log("error encountered");
            });
    }
    );

}

function defaultReference() {
    var ref = document.getElementById('defref-s').value;
    if (ref == 3) {
        document.getElementById('defref').classList.add('d-none');
        document.getElementById('defref-div').classList.remove('d-none');

    }
    else {
        document.getElementById('defref-div').readOnly = true;
        document.getElementById('defref').classList.add('d-none');
        document.getElementById('defref-div').classList.remove('d-none');
        document.getElementById('defref-div').value = ref;
    }
}

function popUPimageUpload() {
    var file = document.getElementById("popupimg").files[0];
    var storageRef = firebase.storage().ref('Popup/' + file.name);
    var task = storageRef.put(file);
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percentage);
        }
    );
    task.then(function (snapshot) {
        storageRef
            .getDownloadURL()
            .then(function (url) {
                console.log('File Upload Successfully');
                Toast.fire({ icon: 'success', title: 'File Uploaded Successfully' });
                firebase.database().ref('Popup').update({
                    image: url
                });
               
            })
            .catch(function (error) {
                console.log("error encountered");
            });
    }
    );

}
