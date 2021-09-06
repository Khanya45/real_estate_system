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
        "needAgent": answer,
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
        fetch("https://desolate-retreat-38151.herokuapp.com/add_property/", {
            method: "POST",
            body: localStorage.getItem("listed_property"),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((res) => res.json())
        .then((json) => {
            if (json["status_code"] = 201){
                window.location.replace("http://127.0.0.1:5501/agentlist.html")
            }
          })
          
    }
    else if (loggedUser.length==4){
        fetch("https://desolate-retreat-38151.herokuapp.com/add_property/", {
            method: "POST",
            body: localStorage.getItem("listed_property"),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((res) => res.json())
        .then((json) => {
            if (json["status_code"] = 201){
                window.location.replace("http://127.0.0.1:5501/agentlist.html")
            }
          })
          
    }
    else{
        alert("Please sign in or create a new account")
    }
}


