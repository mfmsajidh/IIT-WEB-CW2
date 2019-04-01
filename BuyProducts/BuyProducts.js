//GLOBAL VARIABLES
const games = [
    {
        "name": "GOD_OF_WAR",
        "pc": 8000,
        "ps": 12000,
        "xbox": 13000,   
    },
    {
        "name": "COD",
        "pc": 6300,
        "ps": 7400,
        "xbox": 8333, 
    },
    {
        "name": "FIFA",
        "pc": 9000,
        "ps": 10000,
        "xbox": 10000,
    },
    {
        "name": "TOMB_RIDER",
        "pc": 8799,
        "ps": 10000,
        "xbox": 8922,
    },
    {
        "name": "CRICKET",
        "pc": 5600,
        "ps": 7800,
        "xbox": 80000,
    },
    {
        "name": "OVERWATCH",
        "pc": 9000,
        "ps": 9500,
        "xbox": 9800,
    },
    {
        "name": "GTA",
        "pc": 5000,
        "ps": 6700,
        "xbox": 7500,
    },
    {
        "name": "GEAR_OF_WAR",
        "pc": 7500,
        "ps": 8000,
        "xbox": 12000,
    },
    {
        "name": "PUBG",

        "pc": 2300,
        "ps": 4500,
        "xbox": 4600,
    },
    {
        "name": "FORTNITE",
        "pc": 2300,
        "ps": 5500,
        "xbox": 5550,
    },
    {
        "name": "CREED", 
        "pc": 8700,
        "ps": 9288,
        "xbox": 7500,
    },
    {
        "name": "WITCHER",
        "pc": 8900,
        "ps": 12000,
        "xbox": 13500,
    }
]

let modal = document.getElementById('buyProductsModal');
let span = document.getElementsByClassName("close")[0];
let emailText = false
let nameText = false
let phoneNumberText = false
let addressText = false
let selectedValue = ""
let invalidOperators = ["@","!","$","%","^","&","*","=","<",">","?","|","}","{","*","&"]

//Function to get the Radio Values
const getRadioValue = (radioArray) => {
    let i;
    let x =  document.getElementById("AddressContent");

    for (i = 0; i < radioArray.length; i++) {
        if (radioArray[i].checked) {
            //console.log(radioArray[i].value);
            if(radioArray[i].value == "Delivery"){ 
                selectedValue = "Delivery";
                x.style.display = "block";
            }else{
                selectedValue="Reserve";
                x.style.display = "none";
            }
            return radioArray[i].value;
        }
    }
    return "";
}

//Function for Validation  
const validations = (id,promptMessage,promptId,promptColor,typeOfRegex) => {
    let values = document.getElementById(id).value;
    if(values.length == 0){
        producePrompt(promptMessage,promptId,promptColor)
    }else{
        if(typeOfRegex == "names"){
            if(!values.match(/^[a-zA-Z\s]+$/)){
                producePrompt("Please Enter a Valid name", "promptName", "red");
                return false;
            } else {
                producePrompt("&#10003", "promptName", "green");
                nameText = true
            }
        }

        if(typeOfRegex == "phoneNo"){
            if(!values.match(/[+]947\d{8}$/)){
                producePrompt("Please Enter a Valid phone Number", "promptnumber", "red");
                return false;
            }else{
                producePrompt("&#10003", "promptnumber", "green");
                phoneNumberText = true
            }
        }

        if (typeOfRegex == "emails"){
            if(!values.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                producePrompt("Please Enter a Valid Email", "promptemail", "red");
                return false;
            } else {
                producePrompt("&#10003", "promptemail", "green");
                emailText = true
            }
        }

        if (typeOfRegex == "address"){
            if(invalidOperators.includes(values.slice(-1))){
                producePrompt("Please Enter a Valid Address", "promptAddress", "red");
                return false;
            }else{
                producePrompt("&#10003", "promptAddress", "green");
                addressText = true
            }
        }

        if(typeOfRegex == ""){
            return
        }

    }
}

//Function to produce Prompts
const producePrompt = (message,promptLocation,color) => {
   document.getElementById(promptLocation).innerHTML = message;
   document.getElementById(promptLocation).style.color = color; 
}

//Function to add +94 When clicked on a text box
const addInitials = (id) => {
    let val = document.getElementById(id).value;
    if (val == ""){
        document.getElementById(id).value = '+94'
    }
}

//Submit Button Clicked
const submitClicked = (chooseGames,gamingPlatform) => {

   //Selected Games
   let selectedGames = [];
   let i;
   for(i=0;i<chooseGames.length;i++) {
       if(chooseGames[i].checked) {
           selectedGames.push(chooseGames[i].value);
       }
   }

   //Selected Platform
   let selcetedPlatform = [];
    let j;
    for (j = 0; j < gamingPlatform.length; j++) {
        if (gamingPlatform[j].checked) {
          selcetedPlatform.push(gamingPlatform[j].value)
        }
      }

    //Call the function to Calculate Total Price
    const toatlPrice = getTotalPrice(selectedGames,selcetedPlatform);

    //varible to set error messages
    let errorMessage = "";

    let radioVal = getRadioValue("orderType");

    if(document.getElementById("name").value == ""){
        errorMessage += "Please Enter Your Name \n";
    }else{
        if(nameText == false){
            return false
        }
    }

    if(document.getElementById("email").value == ""){
        errorMessage += "Please Enter Your Email \n";
    }else{
        if(emailText == false){
            return false
        }
    }

    if(document.getElementById("number").value == ""){
        errorMessage += "Please Enter Your PhoneNumber \n";
    }else{
        if(phoneNumberText == false){
            return false
        }
    }

    if (selectedValue == ""){
        errorMessage += "Should we deliver or are you reserving \n";
    }else{
        if(selectedValue == "Delivery"){
            if(document.getElementById("address").value == ""){
                errorMessage += "Please Enter Your Address For Us To Deliver \n";
            }else{
                if(addressText == false){
                    return false
                }
            }
        }
    }
    // if(radioVal == ""){
    //     errorMessage += "Should we deliver or are you reserving \n";
    // }else{
    //     if(radioVal == "Delivery"){
    //         if(document.getElementById("address").value == ""){
    //             errorMessage += "Please Enter Your Address For Us To Deliver \n";
    //         }
    //     }
    // }
    
    if (selcetedPlatform.length == 0){
        errorMessage += "Please Select a Platform For Your Game\n";
    }

    if(selectedGames.length == 0){
        errorMessage += "Please Select a Game\n";
    }

    if(errorMessage != ""){
        alert(errorMessage);
        return false;
    }else{
        modal.style.display = "block";
        let name = document.getElementById("name").value
        document.getElementById("buyProductName").innerHTML = name
        document.getElementById("TotalPrice").innerHTML = "Your Total Price is   Rs." + toatlPrice+".00";
        document.getElementById("TotalPrice").style.fontWeight = 'bolder';
        document.getElementById("TotalPrice").style.fontSize = '20px';
        createGamesList(selectedGames,selcetedPlatform)
    }

    document.getElementById("purchaseForm").reset();
    selcetedPlatform = []
    selectedGames = []
}

//Function to display the pop up
span.onclick = () => {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  //Function for dismissing popup[]
  dismiss = () => {
    document.getElementById("purchaseStatement").innerHTML = "Thank You For Purchasing, Please wait until Purchase is made"
    document.getElementById("loader11").style.display = "inline-block"  
    setTimeout(() => {
        window.location.href = '../HomePage/Home.html';
        modal.style.display = "none";
    },4000)
  }

  //Function to calculate the Total Price
const getTotalPrice = (selectedGames,selectedPlatform) => {
 
    let totalPrice = 0;
    let noOfPlatform = selectedPlatform.length
    let gamesArray = [...games];

    if (noOfPlatform == 1){
        for(let platform of selectedPlatform){
            if(platform == "PC"){
                for(let value of selectedGames){
                    for(let val of gamesArray){
                        if(value == val.name){
                            totalPrice = totalPrice + val.pc;
                        }
                    }
                }
            }else if(platform == "PS"){
                for(let value of selectedGames){
                    for(let val of gamesArray){
                        if(value == val.name){
                            totalPrice = totalPrice + val.ps;
                        }
                    }
                }
            }else{
                for(let value of selectedGames){
                    for(let val of gamesArray){
                        if(value == val.name){
                            totalPrice = totalPrice + val.xbox;
                        }
                    }
                }
            }  
        }
    }

    if(noOfPlatform == 2){
        if((selectedPlatform.includes("PC")) && (selectedPlatform.includes("PS"))){
            for(let value of selectedGames){
                for(let val of gamesArray){
                    if(value == val.name){
                        totalPrice = totalPrice + val.ps + val.pc
                    }
                }
            }
        }else if((selectedPlatform.includes("PC"))&&(selectedPlatform.includes("XBOX"))){
            for(let value of selectedGames){
                for(let val of gamesArray){
                    if(value == val.name){
                        totalPrice = totalPrice + val.pc + val.xbox
                    }
                }
            }
        }else if((selectedPlatform.includes("PS"))&&(selectedPlatform.includes("XBOX"))){
            for(let value of selectedGames){
                for(let val of gamesArray){
                    if(value == val.name){
                        totalPrice = totalPrice + val.ps + val.xbox
                    }
                }
            }
        }
    }

    if(noOfPlatform == 3){
        for(let value of selectedGames){
            for(let val of gamesArray){
                if(value == val.name){
                    totalPrice = totalPrice + val.ps + val.pc + val.xbox
                }
            }
        }
    }
    return totalPrice;
}

//Function to render a dynamic game list in the popup
const createGamesList = (selectedGames,selectedPlatform) => {

    let span = document.createElement('span')

    selectedPlatform.map((x => {
        console.log(x)
        let node = document.createTextNode(x);
        let node2 = document.createTextNode("/");
        span.appendChild(node);
        span.appendChild(node2);
        let el = document.getElementById("SelectedPlatform").appendChild(span)
    }))
    
    for(let val of selectedGames){
        let listItem = document.createElement("li");
        let node = document.createTextNode(val);
        listItem.appendChild(node);
        let element = document.getElementById("purchasedList");
        element.appendChild(listItem);
    }
}

//Function to increase the font size
const increaseFont = () => {
    bodyId = document.getElementById('buyProductsBody');
    style = window.getComputedStyle(bodyId, null).getPropertyValue('font-size');
    currentSize = parseFloat(style);
    if(currentSize == 20){
        return
    }else{
        bodyId.style.fontSize = (currentSize + 1) + 'px';
    }
}

//function to decrease the font size
const decreaseFont = () => {
    bodyId = document.getElementById('buyProductsBody');
    style = window.getComputedStyle(bodyId, null).getPropertyValue('font-size');
    currentSize = parseFloat(style);
    if(currentSize == 8){
        return
    }else{
        bodyId.style.fontSize = (currentSize - 1) + 'px';
    }
}

//Reset to default font size
const resetDefaultFont = () => {
    bodyId = document.getElementById('buyProductsBody');
    style = window.getComputedStyle(bodyId, null).getPropertyValue('font-size');
    currentSize = parseFloat(style);
    currentSize = 16
    bodyId.style.fontSize = (currentSize) + 'px';
}

//SLIDE SHOW
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";   
  }
  
  slides[slideIndex-1].style.display = "block"; 

}