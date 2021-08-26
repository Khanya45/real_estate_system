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

// ===========================================  LOGIN/SIGNUP PAGE   ==================================================



function agent_signUp(){
  let signedUp = []
  let agentInputs = document.getElementsByTagName("input")
  for (index=0; index<6;index++){
    signedUp.push(agentInputs[index].value)
  }
  localStorage.signed = JSON.stringify(signedUp);
  fetch("https://desolate-retreat-38151.herokuapp.com/agent-registration/", {
  method: "POST",
  body: window.localStorage.getItem("signed"),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((json) => {console.log(json)}
  )
}



