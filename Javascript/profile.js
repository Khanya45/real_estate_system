
function getLoggedUser(){
    loggedUser = JSON.parse(localStorage.getItem("loggedIn"))
    let container = document.querySelector(".user_details")
    console.log(loggedUser)
    if (loggedUser.length>4){
        container.innerHTML = ""
        container.innerHTML =`
        <img src="https://i.postimg.cc/cL0FNSc3/agent1.jpg">
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
                <button>Delete</button>
                <button>Update</button>
                <button>New Account</button>
                <button>Use Another Account</button>
            </div>
        </div>
        `
        fetch("https://desolate-retreat-38151.herokuapp.com/property-by-agent/"+loggedUser[0]+"/", {
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
                <button>Delete</button>
                <button>Update</button>
                <button>New Account</button>
                <button>Use Another Account</button>
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