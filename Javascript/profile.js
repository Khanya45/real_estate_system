// import { Validation } from "./form.js";
// // let validating = new Validation("khanya", "gope");
// 'use strict';
// console.log(Validation.validateForms("khanya", "gope"));


loggedUser = JSON.parse(localStorage.getItem("loggedIn"))
console.log(loggedUser)
function getLoggedUser(){
    let container = document.querySelector(".user_details")
    // console.log(loggedUser)
    if (loggedUser.length>4){
        container.innerHTML = ""
        
        container.innerHTML =`
        <img src="${loggedUser[3]}">
        <div class="info">
            <div class="info1">
                <h3>${loggedUser[4]}</h3>
                <h3>${loggedUser[1]}</h3>
                <h3>${loggedUser[2]}</h3>
            </div>
            <div class="info2">
                <h3>${loggedUser[7]}</h3>
                <h3>${loggedUser[5]}</h3>
                <h3>${loggedUser[6]}</h3>
            </div>
            <div class="btn_profile">
                <button onclick="deleteUser()">Delete</button>
                <button onclick="updateProfile()">Update</button>
                <a href="/agent_signup.html"><button>New Account</button></a>
                <a href="/user_signup.html"><button>Use Another Account</button></a>
            </div>
        </div>
        `
        fetch("https://desolate-retreat-38151.herokuapp.com/property-by-agent/"+parseInt(loggedUser[0])+"/", {
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
            let container = document.querySelector(".property_container")
            container.innerHTML = ""
            container.innerHTML = `
                    <div class="img_property">
                        <img src="${loggedUser[3]}">
                    </div>`
        }).catch(error => {
          alert(error)
        })
       
        
    } 
    else if (loggedUser.length == 4){
        container.innerHTML = ""
        container.innerHTML =`
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4MpWMpLfpTWJ0pZNG2BecwCWZ6rOLYqg_0F4wJAisdO3lNDc6XlATOswUBveGK-EbpyI&usqp=CAU">
        <div class="info">
            <div class="info1">
                <h3>${loggedUser[1]}</h3>
            </div>
            <div class="info2">
                <h3>${loggedUser[2]}</h3>
                <h3>${loggedUser[3]}</h3>
            </div>
            <div class="btn_profile">
                <button onclick="deleteUser()">Delete</button>
                <button onclick="updateProfile()">Update</button>
                <a href="/agent_signup.html"><button>New Account</button></a>
                <a href="/user_signup.html"><button>Use Another Account</button></a>
            </div>
        </div>
        `
        fetch("https://desolate-retreat-38151.herokuapp.com/property-by-user/"+loggedUser[0]+"/", {
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
            let container = document.querySelector(".property_container")
            container.innerHTML = ""
            container.innerHTML = `
                    <div class="img_property">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4MpWMpLfpTWJ0pZNG2BecwCWZ6rOLYqg_0F4wJAisdO3lNDc6XlATOswUBveGK-EbpyI&usqp=CAU">
                    </div>`
        }).catch(error=>{
          alert(error)
        })
        
    }
    else{
        let info = document.querySelectorAll(".info")
        info.innerHTML = ""
        info.innerHTML = `<h1>Please Log In Or Sign In By Clicking The Profile Icon On The Top Right</h1>`
        
    }
}

getLoggedUser();

function updateProfile(){
    let container = document.querySelector(".info")
    container.innerHTML = ""
    
    if (loggedUser.length==4){
        container.innerHTML = `
        <div class="form user_form">
            <input
              class="input"
              type="text"
              required
              placeholder="Fullname"
            />
            <input
              class="input"
              type="text"
              required
              placeholder="email"
            />
            <input
              class="input"
              type="password"
              required
              placeholder="password"
            />
          <button onclick="updatedUser()" value="submit" >Update</button>
        </div>
        `
          var inputs = document.getElementsByTagName("input");
          let i = 1;
          for (index = 0; index < inputs.length - 1; ++index) {
            inputs[index].value = loggedUser[i];
            i += 1;
          }
          

    }
    else if (loggedUser.length > 4){
        container.innerHTML = `
        <div class="form">
            <div class=form_1>
                <input
                class="input"
                type="text"
                required
                placeholder="Estate Agent"
                />
                <input
                class="input"
                type="text"
                required
                placeholder="Location"
                />
                <input
                class="input"
                type="text"
                required
                placeholder="Image"
                />    
                <input
                class="input"
                type="text"
                required
                placeholder="Fullname"
                />
            </div>
            <div class="form_2">
                <input
                class="input"
                type="password"
                required
                placeholder="password"
                />
                <input
                class="input"
                type="text"
                required
                placeholder="email"
                />
                <input
                class="input"
                type="text"
                required
                placeholder="Mobile"
                />
            <input type="submit" onclick="updatedUser()" value="submit" />
            </div>
        </div>
        `
          var inputs = document.getElementsByTagName("input");
          let i = 1;
          for (index = 0; index < inputs.length - 1; ++index) {
            inputs[index].value = loggedUser[i];
            i += 1;
          }
    }
    else {
        alert("Please log in or create a new account")
    }
}

function updatedUser() {
    var inputs = document.getElementsByTagName("input");
    if (loggedUser.length==4){
        // console.log(loggedUser)
        let updatedUser = {
          fullname: inputs[0].value,
          email: inputs[1].value,
          password: inputs[2].value,
        };
        fetch("https://desolate-retreat-38151.herokuapp.com/edit-user/" + loggedUser[0] + "/", {
          method: "PUT",
          body: JSON.stringify(updatedUser),
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
            if (json.content === "successful") {
              alert("Updated successfully.Please log in to see your updates");
              var inputs = document.getElementsByTagName("input");
              for (index = 0; index < inputs.length - 1; ++index) {
                inputs[index].value = "";
              }
              localStorage.loggedIn = updatedUser
            } else {
              alert("update not successful");
            }
          }).catch(error => {
            alert(error)
          });
    }
    else if (loggedUser.length>4){
        // console.log(loggedUser)
        let updatedUser = {
            fullname: inputs[3].value,
            email: inputs[5].value,
            password: inputs[4].value,
            estate_agent:inputs[0].value,
            location:inputs[1].value,
            image:inputs[2].value,
            mobile:inputs[6].value
          };
          
          fetch("https://desolate-retreat-38151.herokuapp.com/edit-agent/" + loggedUser[0] + "/", {
            method: "PUT",
            body: JSON.stringify(updatedUser),
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
              if (json.content === "successful") {
                alert("Updated successfully. Please log in to see your updates");
                var inputs = document.getElementsByTagName("input");
                for (index = 0; index < inputs.length - 1; ++index) {
                  inputs[index].value = "";
                }
                localStorage.loggedIn = updatedUser
              } else {
                alert("update not successful");
              }
            }).catch(error => {
              alert(error)
            });
    }
  }

function getProperty(){
  if (loggedUser.length > 4){
    fetch("https://desolate-retreat-38151.herokuapp.com/property-by-agent/"+loggedUser[0]+"/", {
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
          yourProperty = json.data
          localStorage.agentProperty = JSON.stringify(yourProperty)
          // console.log(yourProperty)
          let container = document.querySelector(".property_container")
          container.innerHTML = ""
          yourProperty.forEach(property=>{
            container.innerHTML += `
            <div class="property_card">
              <div class="img_property">
                  <img src="${property[7]}">
              </div>
              <div class="btn_property">
                <button onclick="showForm(${property[0]})">Update</button>
                <button onclick="deleteProperty(${property[0]})">Delete</button>
              </div>  
            
            </div>
            `
          })

    }).catch(error => {
      alert(error)
    })
  }  
  else if(loggedUser.length == 4){
    fetch("https://desolate-retreat-38151.herokuapp.com/property-by-user/"+loggedUser[0]+"/", {
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
          yourProperty = json.data
          localStorage.userProperty = JSON.stringify(yourProperty)
          let container = document.querySelector(".property_container")
          if (yourProperty.length > 0){
            container.innerHTML = ""
            yourProperty.forEach(property=>{
              container.innerHTML += `
              <div class="property_card">
                <div class="img_property">
                    <img src="${property[7]}">
                </div>
                <div class="btn_property">
                <button onclick="showForm(${property[0]})">Update</button>
                <button onclick="deleteProperty(${property[0]})">Delete</button>
              </div>  
              </div>
              `
            })
          }
          else{
            container.innerHTML = ""
            container.innerHTML = `
            <h2>You have no properties yet</h2>
            <div class="property_card">
              <div class="img_property">
                  <img src="https://images.assetsdelivery.com/compings_v2/ahasoft2000/ahasoft20001509/ahasoft2000150900212.jpg">
              </div>
              </div>
              <div class="property_card">
              <div class="img_property">
                  <img src="https://images.assetsdelivery.com/compings_v2/ahasoft2000/ahasoft20001509/ahasoft2000150900212.jpg">
              </div>
              </div>
              
            `
          }
    }).catch(error => {
      alert(error)
    })
  }
  else{
    alert("You have no properties")
  }
}


getProperty();


function deleteUser(){
  if (loggedUser.length>4){
    fetch("https://desolate-retreat-38151.herokuapp.com/delete-agent/" + loggedUser[0] + "/")
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => console.log(data))
    .catch(error => {
      alert(error)
    });
    localStorage.removeItem("loggedUser");
  }
  else if (loggedUser.length=4){
    fetch("https://desolate-retreat-38151.herokuapp.com/delete-user/" + loggedUser[0] + "/")
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => console.log(data))
    .catch(error => {
      alert(error)
    });
    localStorage.removeItem("loggedIn");
    getLoggedUser()
  }
  else{
    alert("Please log in")
  }
}

function showForm(property_id){
  let container = document.querySelector(".form_container")
  container.style.visibility = "visible";
  properties = JSON.parse(localStorage.getItem("agentProperty"))
  
  let propertyAgent = properties.find(property=>{
    return property[0] == property_id
  })
  // console.log(propertyAgent)
  localStorage.propAgent = JSON.stringify(propertyAgent)
  let inputs = document.getElementsByTagName("input")
  let description = document.querySelector("textarea")
  let property_type = document.getElementById("property_type")
  let listing_type = document.getElementById("listing_type")
  // console.log(description.value)
  inputs[0].value = propertyAgent[6]
  inputs[1].value = propertyAgent[3]
  inputs[2].value = propertyAgent[7]
  if (propertyAgent[1] == "house"){
    property_type.options[1].selected = true;
  }
  else if (propertyAgent[1] == "townhouse"){
    property_type.options[3].selected = true;
  }
  else{
    property_type.options[2].selected = true;
    }

  if (propertyAgent[5] == "sale"){
    listing_type.options[1].selected = true;
  }
  else{
    listing_type.options[2].selected = true;
    } 
  description.value = propertyAgent[2]
}

function updateProperty(){
  values = []
  let propertyAgent = JSON.parse(localStorage.getItem("propAgent"))
  console.log(propertyAgent)
  let inputs = document.getElementsByTagName("input")
  for (index=0;index<inputs.length;index++){
      values.push(inputs[index].value)
  }
  option_one = document.getElementById("property_type")
  option_two = document.getElementById("listing_type")
  var property_type = option_one.options[option_one.selectedIndex].value
  var listing_type = option_two.options[option_two.selectedIndex].value
  let description = document.querySelector("textarea").value
  let update_property = {
      "property_type":property_type,
      "listing_type":listing_type,
      "description":description,
      "price":values[1],
      "address":values[0],
      "image":values[2],
  }
  fetch("https://desolate-retreat-38151.herokuapp.com/edit-property/" + propertyAgent[0] + "/", {
    method: "PUT",
    body: JSON.stringify(update_property),
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
      console.log(json)
    })
  .catch(error => {
    alert(error)
  })
}

function deleteProperty(id){
  if (loggedUser.length > 4){
    fetch("https://desolate-retreat-38151.herokuapp.com/delete-agent/" + id + "/")
      .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
      .then((data) => {
        console.log(data)
      }).catch(error => {
        alert(error)
      })
      window.location.reload()
      getProperty()
  }else if (loggedUser.length == 4){
    fetch("https://desolate-retreat-38151.herokuapp.com/delete-user/" + id + "/")
      .then((response) => 
      (response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        console.log(data)
      }).catch(error => {
        alert(error)
      })
      window.location.reload()
      getProperty()
  }
  else{
    alert("Please log in")
  }
}

function validateForms(){
  for (index=0;index<arguments.length;index++){
    if (isNaN(arguments[index])== false){
      return false
    }
    else if(arguments[index].trim()==null){
      return false
    }
    else if(arguments[index].trim()==""){
      return false
    }
    else{
      return true
    }
  }
}



function validateEmail(email){
  try {
    let atpos=email.indexOf("@");  
    let dotpos=email.lastIndexOf(".");  
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=atpos.length){  
      alert("Please enter a valid e-mail address");  
      return false;  
    }
    else{
      return true
    }
  }
  catch(error) {
    alert("invalid email")
  } 
}  

function validateNumbers(){
  for (index=0;index<arguments.length;index++){
    if (isNaN(parseInt(arguments[index]))){
      alert("Enter a valid mobile")
      return false; 
    }else if (parseInt(arguments[index].trim())==null){
      return false; 
    }else if(parseInt(arguments[index].trim())==""){
      return false
    }
    else{
      return true
    }
  }
}