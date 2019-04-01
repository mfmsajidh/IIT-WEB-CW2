window.onscroll = function () {
    showHideNavBar()
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function showHideNavBar() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
        document.getElementById("navbartitle-li").innerHTML = "<a href=\"../HomePage/Home.html\"><img src=\"../Assets/Images/Gameradar.png\" class=\"main-logo\"/></a>";
    } else {
        navbar.classList.remove("sticky");
        document.getElementById("navbartitle-li").innerHTML = " ";

    }
    if ((window.innerHeight + window.scrollY + 400) >= document.body.offsetHeight) {
        document.getElementById('navbar').style.display = 'none';

    } else {
        document.getElementById('navbar').style.display = '';
    }
}


