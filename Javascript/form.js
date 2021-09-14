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

function agent_signUp() {
  let signedUp = {};
  let agentInputs = document.getElementsByTagName("input");
  let valid = validateForms(
    agentInputs[0].value,
    agentInputs[1].value,
    agentInputs[2].value,
    agentInputs[3].value,
    agentInputs[5].value
  );
  let validEmail = validateEmail(agentInputs[5].value);
  let validateNumber = validateNumbers(agentInputs[4].value);
  console.log(valid);
  console.log(validateNumber);
  if (
    agentInputs.length >= 7 &&
    valid == true &&
    validEmail == true &&
    validateNumber == true
  ) {
    signedUp = {
      fullname: agentInputs[0].value,
      estate_agent: agentInputs[1].value,
      location: agentInputs[2].value,
      image: agentInputs[3].value,
      mobile: agentInputs[4].value,
      email: agentInputs[5].value,
      password: agentInputs[6].value,
    };
    user = JSON.stringify(signedUp);
    fetch("https://desolate-retreat-38151.herokuapp.com/agent-registration/", {
      method: "POST",
      body: user,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((json) => {
        if (json["status_code"] == 201) {
          localStorage.loggedIn = user;
          window.location.replace("/index.html");
          alert("Please sign in after sign up");
        }
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    alert("Fill all the info required");
  }
}

function user_signUp() {
  let agentInputs = document.getElementsByTagName("input");
  signedUp = {
    fullname: agentInputs[7].value,
    email: agentInputs[8].value,
    password: agentInputs[9].value,
  };
  let valid = validateForms(
    signedUp["fullname"],
    signedUp["email"],
    signedUp["password"]
  );
  if ((signedUp.length = 3 || valid == true)) {
    user = JSON.stringify(signedUp);
    fetch("https://desolate-retreat-38151.herokuapp.com/user-registration/", {
      method: "POST",
      body: user,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((json) => {
        console.log(json);
        if (json["status_code"] == 201) {
          localStorage.loggedIn = user;
          window.location.replace("/index.html");
          alert("Please sign in after sign up");
        }
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    alert("Fill all the info required");
  }
}
// ===========================================  SIGNIN PAGE FOR USER & AGENT   ==================================================

function signIn() {
  let user = [];
  let inputs = document.getElementsByTagName("input");
  fetch("https://desolate-retreat-38151.herokuapp.com/get-users/", {
    method: "get",
  })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((json) => {
      users = json.data;
      for (index = 0; index < inputs.length; ++index) {
        user.push(inputs[index].value);
      }
      let login = users.find((logged) => {
        return logged[3] == user[1];
      });
      if (login) {
        localStorage.loggedIn = JSON.stringify(login);
        window.location.replace("/index.html");
      } else {
        fetch("https://desolate-retreat-38151.herokuapp.com/get-agents/", {
          method: "get",
        })
          .then((res) => res.json())
          .then((json) => {
            agents = json.data;
            console.log("welcome back", agents);
            let login = agents.find((logged) => {
              return logged[5] == user[1];
            });
            if (login) {
              localStorage.loggedIn = JSON.stringify(login);
              window.location.replace("/index.html");
            } else {
              alert("User not found");
            }
          });
      }
    })
    .catch((error) => {
      alert(error);
    });
}

// ========================= DATA VALIDATION =============================

// export default class Validation {
//   constructor(...arguments) {

//   }

//   validateForms(){
//     for (index=0;index<arguments.length;index++){
//       if (isNaN(arguments[index])== false){
//         return false
//       }
//       else if(arguments[index].trim()==null){
//         return false
//       }
//       else if(arguments[index].trim()==""){
//         return false
//       }
//       else{
//         return true
//       }
//     }
//   }

//   validateEmail(email){
//     let atpos=email.indexOf("@");
//     let dotpos=email.lastIndexOf(".");
//     if (atpos<1 || dotpos<atpos+2 || dotpos+2>=atpos.length){
//       alert("Please enter a valid e-mail address");
//       return false;
//     }
//     else{
//       return true
//     }
//   }

//   validateNumbers(){
//     for (index=0;index<arguments.length;index++){
//       if (isNaN(parseInt(arguments[index]))){
//         alert("Enter a valid mobile")
//         return false;
//       }else if (parseInt(arguments[index].trim())==null){
//         return false;
//       }else if(parseInt(arguments[index].trim())==""){
//         return false
//       }
//       else{
//         return true
//       }
//     }
//   }
// }

function validateForms() {
  for (index = 0; index < arguments.length; index++) {
    if (isNaN(arguments[index]) == false) {
      return false;
    } else if (arguments[index].trim() == null) {
      return false;
    } else if (arguments[index].trim() == "") {
      return false;
    } else {
      return true;
    }
  }
}

function validateEmail(email) {
  let atpos = email.indexOf("@");
  let dotpos = email.lastIndexOf(".");
  if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= atpos.length) {
    alert("Please enter a valid e-mail address");
    return false;
  } else {
    return true;
  }
}

function validateNumbers() {
  for (index = 0; index < arguments.length; index++) {
    if (isNaN(parseInt(arguments[index]))) {
      alert("Enter a valid mobile");
      return false;
    } else if (parseInt(arguments[index].trim()) == null) {
      return false;
    } else if (parseInt(arguments[index].trim()) == "") {
      return false;
    } else {
      return true;
    }
  }
}
