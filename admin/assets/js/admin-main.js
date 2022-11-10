firebase.database().ref('Contact-Form').on('value', (snap) => {
    document.getElementById('totalQueries').innerHTML = snap.numChildren();
})

firebase.database().ref('Newsletter-Form').on('value', (snap) => {
    document.getElementById('totalSubscription').innerHTML = snap.numChildren();
})
firebase.database().ref('Volunteer-Form').on('value', (snap) => {
    document.getElementById('totalVolunteers').innerHTML = snap.numChildren();
})
firebase.database().ref('Mailbox').on('value', (snap) => {
    document.getElementById('mailsidebar').innerHTML = snap.numChildren();
})

function hideSidebar() {
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('contact-section').style.display = 'none';
    document.getElementById('newsletter-section').style.display = 'none';
    document.getElementById('system-mail').style.display = 'none';
    document.getElementById('profile-section').style.display = 'none';
    document.getElementById('volunteer-section').style.display = 'none';
}

function viewQuery() {
    hideSidebar();
    Toast.fire({
        icon: 'success',
        title: 'Contact'
    });
    document.getElementById('contact-section').style.display = 'block';
}

function viewVolunteer() {
    hideSidebar();
    Toast.fire({
        icon: 'success',
        title: 'Volunteer'
    });
    document.getElementById('volunteer-section').style.display = 'block';
}

function viewNewsletter() {
    hideSidebar();
    Toast.fire({
        icon: 'success',
        title: 'Newsletter'
    })
    document.getElementById('newsletter-section').style.display = 'block';
}

function viewSystemMail() {
    hideSidebar();
    Toast.fire({
        icon: 'success',
        title: 'System Mail'
    })
    document.getElementById('system-mail').style.display = 'block';
}

function viewProfile() {
    hideSidebar();
    Toast.fire({
        icon: 'success',
        title: 'Profile'
    })
    document.getElementById('profile-section').style.display = 'block';
}
function exit() {
    hideSidebar();
    Toast.fire({
        icon: 'success',
        title: 'Dashboard'
    })
    document.getElementById('dashboard-section').style.display = 'block';
}

(function ($) {

    "use strict";

    var fullHeight = function () {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });

    };
    fullHeight();

    $('#sidebarCollapse').on('click', function () {
        $(this).html('<i class="fa fa-arrow-left"></i>');
        $('#sidebar').toggleClass('active');
    });

})(jQuery);

//Counter Section
function counterUpdate() {
    $('.counter').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})