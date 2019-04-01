isNameValid = false;
isEmailValid = false;
comments = [];

document.getElementById("name-warning").style.display = "none"
document.getElementById("email-warning").style.display = "none"
let nametextfield = document.getElementById("nameTextField");
nametextfield.addEventListener("blur", () => {
    showNameWarning()
})
nametextfield.addEventListener("focus", () => {
    hideNameWarning()
})

let emailTextField = document.getElementById("emailTextField");
emailTextField.addEventListener("blur", () => {
    showEmailWarning()
});
emailTextField.addEventListener("focus", () => {
    hideEmailWarning()
});

const removeDefaultSelectElement = () => {
    let dropdown = document.getElementById("rate-site-dropdown");
    if (document.getElementById("default") != null) {
        dropdown.remove(0)
    }
    return false;
}

const changeFunc = () => {
    var selectBox = document.getElementById("rate-site-dropdown");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    removeDefaultSelectElement();
}

const validateSelectElement = () => {
    if (document.getElementById("default") != null) {
        alert("Please Rate Our Site..")
        return false;
    }
    return true;
}


const showNameWarning = () => {
    if (document.getElementById("nameTextField").value == "") {
        document.getElementById("name-warning").style.display = "inline";
        isNameValid = false;
    } else {
        isNameValid = true;
    }
}
const hideNameWarning = () => {
    document.getElementById("name-warning").style.display = "none"
}

const showEmailWarning = () => {
    var re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (document.getElementById("emailTextField").value == "") {
        document.getElementById("email-warning").style.display = "inline"
        document.getElementById("email-warning").innerHTML = "Please Fill out the Email*";
        isEmailValid = false;
    } else if (!(document.getElementById("emailTextField").value.match(re))) {
        document.getElementById("email-warning").style.display = "inline"
        document.getElementById("email-warning").innerHTML = "Please Enter a valid Email*";
        isEmailValid = false;
    } else {
        isEmailValid = true;
    }
}

const hideEmailWarning = () => {
    document.getElementById("email-warning").style.display = "none"
}

const validate = () => {
    if (!validateSelectElement()) {
        return false;
    }
    if (!isNameValid) {
        showNameWarning()
        return false
    }
    if (!isEmailValid) {
        showEmailWarning()
        return false
    }
    getData()
    return false
}

const getData = () => {
    let name = document.getElementById("nameTextField").value;
    let email =  document.getElementById("emailTextField").value;
    let comment = document.getElementById("comment-textArea").value;
    var selectBox = document.getElementById("rate-site-dropdown");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
 
    showComment(name, comment, selectedValue)
    comments.push(commentObj(name, email, comment));
    console.log(comments);

    return false

}

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("reviews-close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const showComment = (name, comment, selectedValue) => {

    modal.style.display = "block";
    document.getElementById("comment-user-name").innerHTML = name;
    document.getElementById("comment-rating").innerHTML = selectedValue;
    document.getElementById("comment-text").innerHTML = "\"" + comment + "\"";
    

    return false
}

const dismiss = () => {
    document.getElementById("nameTextField").value = ""
    document.getElementById("emailTextField").value = ""
    document.getElementById("comment-textArea").value = ""
    document.getElementById("comments-container").innerHTML = ""
    for (let i = 0; i<comments.length; i++){
        let commentString = JSON.stringify(comments[i]);
        let commentObject = JSON.parse(commentString);
        document.getElementById("comments-container").innerHTML += comment(commentObject.name, commentObject.email, commentObject.comment)
    }
    modal.style.display = "none";
}

const comment = (name, email, text) => {
    let comment = "<div class=\"comment-container\"><span class=\"comment-user-name\">"+ name +"</span><span class=\"comment-email\">"+ email +"</span><span class=\"comment-text-container\">"+ text +"</span></div>"
    return comment;
}

for (let i = 0; i<comments.length; i++){
    document.getElementById("comments-container").innerHTML += comment("madusha", "madusha@gmail.com", "this is a comment comment comment")
}

const commentObj = (name, email, comment) => {
    let cmnt = {name: name, email: email, comment:comment}
    return cmnt;
}



