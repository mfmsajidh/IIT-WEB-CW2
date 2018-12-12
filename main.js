window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  }
    else {
    navbar.classList.remove("sticky");
    
  }
  if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
    document.getElementById('navbar').style.display='none';
    
  }
  else{
    document.getElementById('navbar').style.display='';
  }
}
