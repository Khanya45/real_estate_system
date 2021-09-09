function sellProperty(){
    values = []
    let inputs = document.getElementsByTagName("input")
    for (index=0;index<inputs.length;index++){
        values.push(inputs[index].value)
    }
    option_one = document.getElementById("property_type")
    option_two = document.getElementById("listing_type")
    var property_type = option_one.options[option_one.selectedIndex].value
    var listing_type = option_two.options[option_two.selectedIndex].value
    let description = document.querySelector("textarea").value
    let getAgent= confirm("Do you need an agent");
    if (getAgent == true) {
        answer = "Yes"
    } else {
        answer = "No"
    } 
    let new_property = {
       "property_type":property_type,
       "listing_type":listing_type,
       "description":description,
       "price":parseInt(values[1]),
       "address":values[0],
       "image":values[2],
    }
    console.log(new_property)
    loggedUser = JSON.parse(localStorage.getItem("loggedIn"))
    localStorage.listed_property = JSON.stringify(new_property)
   
    if (loggedUser.length>4){
        new_property.agent_id = loggedUser[0]
        fetch("https://desolate-retreat-38151.herokuapp.com/add_property_agent/", {
            method: "POST",
            body: JSON.stringify(new_property),
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
            if (json["status_code"] = 201){
                window.location.replace("http://127.0.0.1:5501/index.html")
            }
            else{
                alert("Could not add your property")
            }
          }).catch(error => {
            alert(error)
          })
          
    }
    else if (loggedUser.length==4){
        if (answer == "No"){
            new_property.user_id = loggedUser[0]
            fetch("https://desolate-retreat-38151.herokuapp.com/add_property_user/", {
                method: "POST",
                body: localStorage.getItem("listed_property"),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },})
            .then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                  } else {
                    throw Error(response.statusText);
                  }
            })
            .then((json) => {
                if (json["status_code"] = 201){
                    window.location.replace("http://127.0.0.1:5501/index.html")
                }
                else{
                    alert("Could not add your property")
                }
            }).catch(error => {
                alert(error)
              })
        }
        else{
            window.location.replace("http://127.0.0.1:5501/agentlist.html")
        }
    }
    else{
        alert("Please sign in or create a new account")
    }
}


//  if (loggedUser.length==4){
//     if (new_property["needAgent"] == "Yes"){
//         new_property.agent_id = 6
//     }
//     fetch("https://desolate-retreat-38151.herokuapp.com/add_property/", {
//         method: "POST",
//         body: localStorage.getItem("listed_property"),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8",
//         },
//     })
//     .then((res) => res.json())
//     .then((json) => {
//         if (json["status_code"] = 201){
//             window.location.replace("http://127.0.0.1:5501/agentlist.html")
//         }
//       })
// }

