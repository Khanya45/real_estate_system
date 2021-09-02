let tabPanes = document
  .getElementsByClassName("tab-header")[0]
  .getElementsByTagName("div");

for (let i = 0; i < tabPanes.length; i++) {
  tabPanes[i].addEventListener("click", function () {
    document
      .getElementsByClassName("tab-header")[0]
      .getElementsByClassName("active")[0]
      .classList.remove("active");
    tabPanes[i].classList.add("active");

    document
      .getElementsByClassName("tab-content")[0]
      .getElementsByClassName("active")[0]
      .classList.remove("active");
    document
      .getElementsByClassName("tab-content")[0]
      .getElementsByClassName("tab-body")
      [i].classList.add("active");
  });
}

user = [];
newUser = [];

// ===========================================  SIGNUP PAGE FOR USER & AGENT   ==================================================



function agent_signUp(){
  let signedUp = {}
  let agentInputs = document.getElementsByTagName("input")
  if (agentInputs.length=10){
    signedUp ={
      "fullname":agentInputs[0].value,
      "estate_agent":agentInputs[1].value,
      "location":agentInputs[2].value,
      "image":agentInputs[3].value,
      "mobile":agentInputs[4].value,
      "email":agentInputs[5].value,
      "password":agentInputs[6].value
    }
    user = JSON.stringify(signedUp)
    fetch("https://desolate-retreat-38151.herokuapp.com/agent-registration/", {
    method: "POST",
    body: user,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
     })
    .then((response) => response.json())
    .then((json) => {
      if (json.data["status_code"] == 201 ){
        localStorage.loggedIn = user
        window.location.replace("http://127.0.0.1:5501/index.html")
        alert("Please sign in after sign up")
      } 
    }
    )
  }else{
    alert("Fill all the info required")
  }
}

function user_signUp(){
  let agentInputs = document.getElementsByTagName("input")
  signedUp ={
    "fullname":agentInputs[7].value,
    "email":agentInputs[8].value,
    "password":agentInputs[9].value
  }
  if (signedUp.length=3){
    user = JSON.stringify(signedUp)
    fetch("https://desolate-retreat-38151.herokuapp.com/user-registration/", {
      method: "POST",
      body: user,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      if (json["status_code"] == 201 ){
        localStorage.loggedIn = user
        window.location.replace("http://127.0.0.1:5501/index.html")
        alert("Please sign in after sign up")
      } 
    }
    )
  }
  else{
    alert("Fill all the info required")
  }
}

// ===========================================  SIGNIN PAGE FOR USER & AGENT   ==================================================


function signIn(){
  let user = []
  let inputs = document.getElementsByTagName("input")
  fetch("https://desolate-retreat-38151.herokuapp.com/get-users/", {
        method: "get",
        })
  .then((res) => res.json())
  .then((json) => {
    users = json.data
    for (index = 0; index < inputs.length; ++index) {
      user.push(inputs[index].value);
    }
    let login = users.find((logged) => {
      return logged[3] == user[1];
    });
    if (login){
      localStorage.loggedIn = JSON.stringify(login)
      window.location.replace("http://127.0.0.1:5501/index.html")
    } 
    else{
      fetch("https://desolate-retreat-38151.herokuapp.com/get-agents/", {
        method: "get",
        })
      .then((res) => res.json())
      .then((json) => {
        agents = json.data
        console.log("welcome back",agents)
        let login = agents.find((logged) => {
          return logged[5] == user[1];
        });
        if (login){
          localStorage.loggedIn = JSON.stringify(login)
           window.location.replace("http://127.0.0.1:5501/index.html")
        }
        else{
          alert("User not found")
        }
        })
        
      }
  })
}