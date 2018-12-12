window.onscroll = function () {
    myFunction()
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
        document.getElementById("navbartitle").innerHTML = "Course Work";
    } else {
        navbar.classList.remove("sticky");
        document.getElementById("navbartitle").innerHTML = "";

    }
    if ((window.innerHeight + window.scrollY + 400) >= document.body.offsetHeight) {
        document.getElementById('navbar').style.display = 'none';

    } else {
        document.getElementById('navbar').style.display = '';
    }
}