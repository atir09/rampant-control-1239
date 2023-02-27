let Url = "https://puce-attractive-bat.cyclic.app/"

UpdateNav()


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

let sign = document.querySelector("#nav_options #sign")
let signupPopup = document.querySelector(".signup-popup")
let sign2 = document.getElementById("sign2")
let signupForm = document.getElementById("signupForm")
let signUpRes = document.getElementById("SignUpResMsg")
let username = document.querySelector(".username")
let signText = document.getElementById("signText")

let log = document.getElementById("log")
let loginPopup = document.querySelector(".login-popup")
let loginForm = document.getElementById("loginForm")
let loginResMsg = document.getElementById("loginResMsg")

let adminlog = document.getElementById("admin")
let adminloginPopup = document.querySelector(".admin-popup")
let adminloginForm = document.getElementById("adminloginForm")
let adminloginResMsg = document.getElementById("adminloginResMsg")


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// /................STicky Navbar...............................//////

// window.onscroll = function() {myFunction()};


// var navbar1 = document.querySelector(".nav");
// var sticky1 = navbar1.offsetTop;
// function myFunction() {
//   if (0 <= sticky1) {
//     navbar1.classList.add("sticky")
//     document.getElementById("display").classList.add("afterFixed")
//   } else {
//     navbar1.classList.remove("sticky");
//     document.getElementById("display").classList.remove("afterFixed")
//   }
// }


// ////////////////////////////////////////////////////////////////////

// ...........................Singup functionality.................../

sign.onclick = (e) => {
  signupPopup.classList.remove("popupHide")
  document.getElementById('fade').style.display = 'block'
}

sign2.onclick = (e) => {
  loginPopup.classList.add("popupHide")
  signupPopup.classList.remove("popupHide")

}

document.getElementById("fade").onclick = (e) => {
  adminloginPopup.classList.add("popupHide")
  signupPopup.classList.add("popupHide")
  loginPopup.classList.add("popupHide")
  document.getElementById('fade').style.display = 'none'
}

signupForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let name = signupForm.name.value
  let email = signupForm.email.value
  let password = signupForm.password.value
  let confirmPass = signupForm.confirmPass.value

  Signup(name, email, password, confirmPass)
})



function Signup(name, email, password, confirmPass) {
  if (validateSingup(name, email, password, confirmPass)) {
    const payload = {
      name: name,
      email: email,
      password: password
    }
    fetch(`${Url}users/register`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.msg == "User already exist, please login" || data.msg == "Unable to Register New User") {
          signUpRes.classList.remove("hide")
          signUpRes.innerText = data.msg
        } else {
          signUpRes?.classList.add("hide")
          login(email, password)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

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
  } else if (confirm != pass) {
    document.getElementById("confirmPassAlert").innerText = "Should be same as Password"
    result = false
  }
  return result

}




// ...........................Login  functionality (Login popup).........................................////



log.onclick = (e) => {
  signupPopup.classList.toggle("popupHide")
  loginPopup.classList.toggle("popupHide")
}

loginForm.addEventListener("submit", (e) => {
  console.log("Clicking")
  e.preventDefault()
  console.log(loginForm.email.value)
  let email = loginForm.email.value
  let password = loginForm.password.value

  login(email, password)
})

function login(email, password) {
  let payload = {
    email, password
  }
  fetch(`${Url}users/login`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  )
    .then(res => res.json())
    .then((res) => {
      if (res.msg == "Invalid Credentials" || res.msg == "Email Not Registered,Please Sign Up" || res.msg == "Unable to log in") {
        loginResMsg.innerText = res.msg
      } else if (res.msg == "Login Successful") {
        loginResMsg.innerText = "Logging In..."
        localStorage.setItem("token", res.token)

        // UpdateNav()
        window.location="index.html"
      }
    })
}

// ..............................................logout functaionality..............................................

let loggedIn = document.getElementById("loggedIn")

loggedIn.addEventListener("click", (event) => {
  event.stopPropagation()
  document.getElementById("logoutPopup").style.display = "block"
  if(document.getElementById("logoutPopup").style.display = "block"){
    window.onclick = (e) => {
      e.preventDefault()
      if (e.target !== document.getElementById("logoutPopup")) {
        document.getElementById("logoutPopup").style.display = "none"
      }
    }
  }
  
})




document.getElementById("logout").addEventListener("click", (e) => {
  e.preventDefault()
  localStorage.clear()
  document.getElementById("logoutPopup").style.display = "none"
  window.location="index.html"

})



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function UpdateNav() {
  fetch(`${Url}authenticate`, {
    method: "POST",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("token") || null}`,
      "Content-type": "application/json"
    }
  })
    .then(res => res.json())
    .then((data) => {
      if (data.user) {
        username.innerText = data.user.name
        sign.style.display = "none"
        document.querySelector(".loggedIn").style.display = "flex"
      } else {
        sign.style.display = "flex"
        document.querySelector(".loggedIn").style.display = "none"
      }

    })
}


// ....................................Carousel..................................//

const sliders = [...document.querySelectorAll(".slider__container")];
const sliderControlPrev = [...document.querySelectorAll(".slider__control.prev")];
const sliderControlNext = [...document.querySelectorAll(".slider__control.next")];

sliders.forEach((slider, i) => {
  let isDragStart = false,
      isDragging = false,
      isSlide = false,
      prevPageX,
      prevScrollLeft,
      positionDiff;

  const sliderItem = slider.querySelector(".slider__item");
  var isMultislide = (slider.dataset.multislide === 'true');

  sliderControlPrev[i].addEventListener('click', () => {
    if (isSlide) return;
    isSlide = true;
    let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
    slider.scrollLeft += -slideWidth;
    setTimeout(function(){ isSlide = false; }, 700);
  });

  sliderControlNext[i].addEventListener('click', () => {
    if (isSlide) return;
    isSlide = true;
    let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth ;
    slider.scrollLeft += slideWidth;
    setTimeout(function(){ isSlide = false; }, 700);
  });

  function autoSlide() {
    if(slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 || slider.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff);
    let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
    let valDifference = slideWidth - positionDiff;
    if(slider.scrollLeft > prevScrollLeft) {
        return slider.scrollLeft += positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
    }
    slider.scrollLeft -= positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
  }

  function dragStart(e) {
    if (isSlide) return;
    isSlide = true;
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
    setTimeout(function(){ isSlide = false; }, 700);
  }

  function dragging(e) {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    slider.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
  }

  function dragStop() {
    isDragStart = false;
    slider.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
  }

  addEventListener("resize", autoSlide);
  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("touchstart", dragStart);
  slider.addEventListener("mousemove", dragging);
  slider.addEventListener("touchmove", dragging);
  slider.addEventListener("mouseup", dragStop);
  slider.addEventListener("touchend", dragStop);
  slider.addEventListener("mouseleave", dragStop);
});




// ........................... admin Login  functionality (Login popup).........................................////



adminlog.onclick = (e) => {
  adminloginPopup.classList.toggle("popupHide")
  document.getElementById('fade').style.display = 'block'
}

adminloginForm.addEventListener("submit", (e) => {
  console.log("Clicking")
  e.preventDefault()
  console.log(adminloginForm.email.value)
  let email = adminloginForm.email.value
  let password = adminloginForm.password.value

  adminlogin(email, password)
})

function adminlogin(email, password) {
  let payload = {
    email, password
  }
  fetch(`${Url}admin/adminLogin`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  )
    .then(res => res.json())
    .then((res) => {
      if (res.msg == "Invalid Credentials" || res.msg == "Email Not Registered,Please Sign Up" || res.msg == "Unable to log in") {
        adminloginResMsg.innerText = res.msg
      } else if (res.msg == "Login Successful") {
        adminloginResMsg.innerText = "Logging In..."
        localStorage.setItem("token", res.token)

        // UpdateNav()
        window.location="admin.html"
      }
    })
}