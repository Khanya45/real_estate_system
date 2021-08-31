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
    // console.log(loggedUser.length)
    localStorage.listed_property = JSON.stringify(new_property)
    if (loggedUser.length>4){
        fetch("http://127.0.0.1:5002/add_property/", {
            method: "POST",
            body: localStorage.getItem("listed_property"),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((res) => res.json())
        .then((json) => {
            console.log(json.data)
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
            console.log(json.data)
          })
          
    }
    else{
        alert("Please sign in or create a new account")
    }
}

