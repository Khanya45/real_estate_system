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
        .then((res) => res.json())
        .then((json) => {
            let container = document.querySelector(".property_container")
            container.innerHTML = ""
            container.innerHTML = `
                    <div class="img_property">
                        <img src="${loggedUser[3]}">
                    </div>`
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
        .then((res) => res.json())
        .then((json) => {
            let container = document.querySelector(".property_container")
            container.innerHTML = ""
            container.innerHTML = `
                    <div class="img_property">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4MpWMpLfpTWJ0pZNG2BecwCWZ6rOLYqg_0F4wJAisdO3lNDc6XlATOswUBveGK-EbpyI&usqp=CAU">
                    </div>`
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
        <div class="form">
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
          <input onclick="updatedUser()" value="submit" />
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
          .then((response) => response.json())
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
            .then((response) => response.json())
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
            });
    }
  }

function getProperty(){
  if (loggedUser.length > 4){
    fetch("https://desolate-retreat-38151.herokuapp.com/property-by-agent/"+loggedUser[0]+"/", {
        method: "get",
        })
        .then((res) => res.json())
        .then((json) => {
          yourProperty = json.data
          console.log(yourProperty)
          let container = document.querySelector(".property_container")
          container.innerHTML = ""
          yourProperty.forEach(property=>{
            container.innerHTML += `
            <div class="property_card">
              <div class="img_property">
                  <img src="${property[7]}">
              </div>
            </div>
            `
          })

    })
  }  
  else if(loggedUser.length == 4){
    fetch("https://desolate-retreat-38151.herokuapp.com/property-by-user/"+loggedUser[0]+"/", {
        method: "get",
        })
        .then((res) => res.json())
        .then((json) => {
          yourProperty = json.data
          let container = document.querySelector(".property_container")
          if (yourProperty.length > 0){
            container.innerHTML = ""
            yourProperty.forEach(property=>{
              container.innerHTML += `
              <div class="property_card">
                <div class="img_property">
                    <img src="${property[7]}">
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
    .then((res) => res.json())
    .then((data) => console.log(data));
    localStorage.removeItem("loggedUser");
  }
  else if (loggedUser.length=4){
    fetch("https://desolate-retreat-38151.herokuapp.com/delete-user/" + loggedUser[0] + "/")
    .then((res) => res.json())
    .then((data) => console.log(data));
    localStorage.removeItem("loggedIn");
    getLoggedUser()
  }
  else{
    alert("Please log in")
  }
  
}