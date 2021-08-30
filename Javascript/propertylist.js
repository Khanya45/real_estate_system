let arrProperties=[];
// ========================= DISPLAYING PROPERTIES FILTERD BY SUBURB ==========================
function displayProperty(arrProperty){
    // arrProperty.forEach(property=> {console.log(property)})
    let container = document.querySelector(".property_container")
    container.innerHTML= "";
    arrProperty.forEach(property => {   
      container.innerHTML += `
      <div class="property_card" onclick="redirectToInfo(${property[0]})">
        <div class="img_property">
            <img src="${property[7]}">
        </div>
        <div class="property_info">
            <h4>${property[1]}</h4>
            <h4>R${property[3]}</h4>
            <h4>${property[6]}</h4>
            <h4>${property[9]}</h4>
        </div>
        <div id="heart_icon">
            <i class="fa fa-heart red-color"></i>
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
    // console.log(checkedBox)
    for (index=0; index<checkedBox.length;index++){
        fetch("https://desolate-retreat-38151.herokuapp.com/property-by-type/"+checkedBox[index]+"/", {
        method: "get",
        })
        .then((res) => res.json())
        .then((json) => {
            arrProp = json.data  
            for (i=0; i<arrProp.length;i++){
                displayProperty(filteredList)
           filteredList.push(arrProp[i])

            }
        })
    }
    // filteredList.forEach(property=>{
    //     console.log(property)
    // })
    // console.log(filteredList)
    console.log(filteredList)
    // displayProperty(filteredList)
    
}

function redirectToInfo(id){
    localStorage.property_id = JSON.stringify(id)
    window.location.replace("http://127.0.0.1:5501/property_det.html")
}

