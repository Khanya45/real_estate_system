let arrProperties=[];
// ========================= DISPLAYING PROPERTIES FILTERD BY SUBURB ==========================
function displayProperty(arrProperty){
    // arrProperty.forEach(property=> {console.log(property)})
    let container = document.querySelector(".property_container")
    container.innerHTML= "";
    arrProperty.forEach(property => {   
      container.innerHTML += `
      <div class="property_card">
        <div class="img_property" onclick="redirectToInfo(${property[0]})">
            <img src="${property[7]}">
        </div>
        <div class="property_info" onclick="redirectToInfo(${property[0]})">
            <h4>${property[1]}</h4>
            <h4>R${property[3]}</h4>
            <h4>${property[6]}</h4>
            <h4>${property[9]}</h4>
        </div>
        <div id="heart_icon">
            <i onclick="likeIcon()" class="far fa-heart"></i>
        </div>
      </div>
      `
    });
  }

function filterBySuburb(){
    let suburb = localStorage.getItem("filterSuburb");
    fetch("https://desolate-retreat-38151.herokuapp.com/property-by-suburb/"+suburb+"/", {
    method: "get",
    })
    .then((res) => res.json())
    .then((json) => {
        arrProperty = json.data
        // console.log(arrProperty)
        displayProperty(arrProperty)
        arrProperties.push(json.data)
    })
    let header = document.querySelector("#property_header")
    header.innerHTML =""
    header.innerHTML = `<h1>Properties For Sale In ${suburb}</h1>`
}

filterBySuburb();

// ========================= DISPLAYING PROPERTIES FILTERD BY Property Type ==========================

function filterAll(){
    let checkBox = document.getElementsByTagName("input")
    let filteredList = []
    let checkedBox = [];
    for (index=2; index<checkBox.length;index++){
        if (checkBox[index].checked) {
            checkedBox.push(checkBox[index].value)
        }       
    }
    if (checkedBox.length == 3){
        filterBySuburb();
    }
    else{
        for (index=0; index<checkedBox.length;index++){
            fetch("https://desolate-retreat-38151.herokuapp.com/property-by-type/"+checkedBox[index]+"/", {
            method: "get",
            })
            .then((res) => res.json())
            .then((json) => {
                arrProp = json.data  
                for (i=0; i<arrProp.length;i++){
                    filteredList.push(arrProp[i])
                    displayProperty(filteredList)
                }
            })
        }
        console.log(filteredList)
    }   
}

function redirectToInfo(id){
    localStorage.property_id = JSON.stringify(id)
    window.location.replace("http://127.0.0.1:5501/property_det.html")
}

function filterByPrice(){
    let suburb = localStorage.getItem("filterSuburb");
    let price = []
    let checkBox = document.getElementsByTagName("input")
    for (index=0; index<2;index++){
        price.push(checkBox[index].value)  
    }
    if (price.length=2){
        fetch("https://desolate-retreat-38151.herokuapp.com/filter-by-price/"+price[0]+"/"+price[1]+"/"+suburb+"/", {
            method: "get",
            })
            .then((res) => res.json())
            .then((json) => 
            {
                console.log(json.data)
                // price_filtered = json.data
                // let type_filtered = price_filtered.filter(property=> {return property[]})
            })
    }
}

// filterByPrice();


function filterPropertybyPrice(){
    let checkedBox = []
    let checkBox = document.getElementsByTagName("input")
        for (index=0; index<2;index++){
            checkedBox.push(checkBox[index].value)  
        }
    let filtered = arrProperties.filter(property=>{
        return property[3] >= checkedBox[0] && property[3] <= checkedBox[2]
    })
    console.log(arrProperties[0])
    // arrProperties.forEach((property)=>{console.log(property[3])})
}

function likeIcon(){
    let container = document.getElementById("heart_icon")
    container.innerHTML = `<i class="fa fa-heart red-color"></i>`
}