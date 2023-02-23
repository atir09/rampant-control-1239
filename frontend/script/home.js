let Url="http://localhost:8080/"




// ////////////////////////////////Search Functionality//////////////////////////////////////////
let suggestions = [
  "Channel",
  "CodingLab",
  "CodingNepal",
  "YouTube",
  "YouTuber",
  "YouTube Channel",
  "Blogger",
  "Bollywood",
  "Vlogger",
  "Vechiles",
  "Facebook",
  "Freelancer",
  "Facebook Page",
  "Designer",
  "Developer",
  "Web Designer",
  "Web Developer",
  "Login Form in HTML & CSS",
  "How to learn HTML & CSS",
  "How to learn JavaScript",
  "How to became Freelancer",
  "How to became Web Designer",
  "How to start Gaming Channel",
  "How to start YouTube Channel",
  "What does HTML stands for?",
  "What does CSS stands for?"
];

// getting all required elements
const searchInput = document.querySelector(".searchInput");
const input = searchInput.querySelector("input");
const resultBox = searchInput.querySelector(".resultBox");
const icon = searchInput.querySelector(".icon");
let linkTag = searchInput.querySelector("a");
let webLink;

// if user press any key and release
input.onkeyup = (e) => {
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if (userData) {
    emptyArray = suggestions.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      // passing return data inside li tag
      return (data = "<li>" + data + "</li>");
    });
    searchInput.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray);
    let allList = resultBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchInput.classList.remove("active"); //hide autocomplete box
  }
};

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = "<li>" + userValue + "</li>";
  } else {
    listData = list.join("");
  }
  resultBox.innerHTML = listData;
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let sign = document.getElementById("sign")
let signupPopup = document.querySelector(".signup-popup")
let sign2 = document.getElementById("sign2")
let signupForm = document.getElementById("signupForm")

let log = document.getElementById("log")
let loginPopup = document.querySelector(".login-popup")


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ...........................Singup functionality.................../

sign.onclick = (e) => {
  signupPopup.classList.toggle("hide")
}

sign2.onclick = (e) => {
  loginPopup.classList.toggle("hide")
  signupPopup.classList.toggle("hide")
}

signupForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let name = signupForm.name.value
  let email = signupForm.email.value
  let password = signupForm.password.value
  let confirmPass = signupForm.confirmPass.value

  if(validateSingup(name,email,password,confirmPass)){
    const payload={
      name:name,
      email:email,
      password:password
    }
    fetch(`${Url}users/register`,
      {
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(payload)

      }    
    )
    .then((res)=>res.json())
    .then((data)=>{ 
      console.log(data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }



})

function validateSingup(name, email, pass, confirm) {
  document.getElementById("nameAlert").innerText = ""
  document.getElementById("emailAlert").innerText = ""
  document.getElementById("passwordAlert").innerText = ""
  document.getElementById("confirmPassAlert").innerText = ""

  let result = true
  if (name.length < 4) {
    document.getElementById("nameAlert").innerText = "Name cannot be less than 4 characters"
    result = false
  }

  if (!email.includes("@")) {
    document.getElementById("emailAlert").innerText = "Please enter a valid Email"
    result = false
  }

  if (pass.length < 4) {
    document.getElementById("passwordAlert").innerText = "Password cannot be less than 4 characters"
    result = false
  }else if(confirm!=pass){
    document.getElementById("confirmPassAlert").innerText = "Should be same as Password"
    result = false
  }
  return result

}




// ...........................Login  functionality (Login popup).........................................////



log.onclick = (e) => {
  signupPopup.classList.toggle("hide")
  loginPopup.classList.toggle("hide")
}