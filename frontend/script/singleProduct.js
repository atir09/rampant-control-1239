let Url = "http://localhost:8080/"

UpdateNav()
DisplayProduct(Url)


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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////

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
            console.log(res.msg)
            if (res.msg == "Invalid Credentials" || res.msg == "Email Not Registered,Please Sign Up" || res.msg == "Unable to log in") {
                loginResMsg.innerText = res.msg
            } else if (res.msg == "Login Successful") {
                loginResMsg.innerText = "Logging In..."
                localStorage.setItem("token", res.token)

                // UpdateNav()
                window.location = "products.html"
            }
        })
}

// ..............................................logout functaionality..............................................

let loggedIn = document.getElementById("loggedIn")

loggedIn.addEventListener("click", (event) => {
    event.stopPropagation()
    document.getElementById("logoutPopup").style.display = "block"
    if (document.getElementById("logoutPopup").style.display = "block") {
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
    window.location = "index.html"

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

function DisplayProduct(url) {
    let id = localStorage.getItem("selectedProductId")


    fetch(`${url}products/${id}`)
        .then(res => res.json())
        .then((data) => {
            data = data.products
            let card=createCard(data)
            productsSec.innerHTML = card
        })
        .catch(error => console.log(error))

}

let productsSec = document.getElementById("productSec")



function createCard(el) {
    let card = `<div class="card" id=${el._id}>
    <div class="imgContainer"><img
            src=${el.img} alt=""></div>
    <div>
        <p class="productBrand">${el.brand}</p>
        <p class="title">${el.title}</p>
        <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
        <p class="productPrice">Price: $${el.price}</p>
        <p class="small">Ships to India</p>
        <button class="ATC">Add To Basket</button>
    </div>
</div> `
    return card
}