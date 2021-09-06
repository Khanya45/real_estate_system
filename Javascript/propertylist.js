let arrProperties=[];
let suburb = localStorage.getItem("filterSuburb");
let filteredBySuburb= JSON.parse(localStorage.getItem("filterBySuburb"));

// ========================= DISPLAYING PROPERTIES FILTERD BY SUBURB ==========================
function displayProperty(arrProperty){
    let header = document.querySelector("#property_header")
    header.innerHTML =""
    header.innerHTML = `<h1>Properties For Sale In ${suburb}</h1>`

    let container = document.querySelector(".property_container")
    container.innerHTML= "";
    container.innerHTML=`
    <div class="sort">
        <h3>Sort By:</h3>
        <button onclick="sortByDate()">Newest</button>
        <button onclick="sortByLowPrice()">Lowest Price</button>
        <button onclick="sortByHighPrice()">Highest Price</button>
    </div>
    `
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

displayProperty(filteredBySuburb);  


// ========================= DISPLAYING PROPERTIES FILTERD BY Property Type ==========================

function filterPropertyType(){
    let checkBox = document.getElementsByTagName("input")   
    let checkedBox = [];
    let filteredList = [];
    for (index=0; index<checkBox.length;index++){
        if (checkBox[index].checked) {
            checkedBox.push(checkBox[index].value)
        }       
    }
    // console.log(checkedBox);
    if (checkedBox.length == 3){
        displayProperty(filteredBySuburb);
    }
    else{
        for (index=0; index<checkedBox.length;index++){
            let filteredByPropertyType = filteredBySuburb.filter(property => {
                return property[1] == checkedBox[index]
            }) 
            // console.log(filteredByPropertyType)
            for (i=0; i<filteredByPropertyType.length;i++){
                filteredList.push(filteredByPropertyType[i])
                displayProperty(filteredList)
            }
        
        }
        // console.log(filteredList)
        localStorage.filteredPropertyType = JSON.stringify(filteredList)
    }   
}

function redirectToInfo(id){
    localStorage.property_id = JSON.stringify(id)
    window.location.replace("http://127.0.0.1:5501/property_det.html")
}
function likeIcon(){
    let container = document.getElementById("heart_icon")
    container.innerHTML = `<i class="fa fa-heart red-color"></i>`
}

function sortByHighPrice(){
    let properties = JSON.parse(localStorage.getItem("filteredPropertyType"));
    if (filteredBySuburb.length > properties.length) {
        let sortedArray = filteredBySuburb.sort(function(a, b) {
            return b[3] - a[3];
          });
          console.log(sortedArray)
          displayProperty(sortedArray)
    }else{
        let sortedArray = properties.sort(function(a, b) {
            return b[3] - a[3];
          });
          console.log(sortedArray)
          displayProperty(sortedArray)
    }
}

function sortByLowPrice(){
    let properties = JSON.parse(localStorage.getItem("filteredPropertyType"));
    // let properties = JSON.parse(localStorage.getItem("filteredPropertyType"));
    if (filteredBySuburb.length > properties.length) {
        let sortedArray = filteredBySuburb.sort(function(a, b) {
            return a[3] - b[3];
        });
        console.log(sortedArray)
        displayProperty(sortedArray)
    }else{
        let sortedArray = properties.sort(function(a, b) {
            return a[3] - b[3];
        });
        console.log(sortedArray)
        displayProperty(sortedArray)
    }
}

function sortByDate(){
    let properties = JSON.parse(localStorage.getItem("filteredPropertyType"));
    if (filteredBySuburb.length > properties.length) {
        let sortedArray = filteredBySuburb.sort(function(a, b) {
            return a[9] - b[9];
        });
        console.log(sortedArray)
        displayProperty(sortedArray)
    }else{
        let sortedArray = properties.sort(function(a, b) {
            return a[9] - b[9];
        });
        console.log(sortedArray)
        displayProperty(sortedArray)
    }
}

// fetch("https://desolate-retreat-38151.herokuapp.com/get-agent-info/1/", {
//     method: "get",
//     })
// .then((res) => res.json())
// .then((json) => {
//     let agent = json.data
//     console.log(agent[0][1])
// })


// ==========================================================================================================================


// function filterByPrice(){
//     let suburb = localStorage.getItem("filterSuburb");
//     let price = []
//     let checkBox = document.getElementsByTagName("input")
//     for (index=0; index<2;index++){
//         price.push(checkBox[index].value)  
//     }
//     if (price.length=2){
//         fetch("https://desolate-retreat-38151.herokuapp.com/filter-by-price/"+price[0]+"/"+price[1]+"/"+suburb+"/", {
//             method: "get",
//         })
//             .then((res) => res.json())
//             .then((json) => 
//             {
//                 console.log(json.data)
//                 // price_filtered = json.data
//                 // let type_filtered = price_filtered.filter(property=> {return property[]})
//             })
//         }
//     }
    
//     function filterPropertybyPrice(){
//         let checkedBox = []
//     let checkBox = document.getElementsByTagName("input")
//     for (index=0; index<2;index++){
//         checkedBox.push(checkBox[index].value)  
//     }
//         let filtered = arrProperties.filter(property=>{
//             return property[3] >= checkedBox[0] && property[3] <= checkedBox[2]
//         })
//         console.log(arrProperties[0])
//         // arrProperties.forEach((property)=>{console.log(property[3])})
//     }
    
// function filterBySuburb(){
//     let suburb = localStorage.getItem("filterSuburb");
//     fetch("https://desolate-retreat-38151.herokuapp.com/property-by-suburb/"+suburb+"/", {
//     method: "get",
//     })
//     .then((res) => res.json())
//     .then((json) => {
//         arrProperty = json.data
//         // console.log(arrProperty)
//         displayProperty(arrProperty)
//         arrProperties.push(json.data)
//     })
//     let header = document.querySelector("#property_header")
//     header.innerHTML =""
//     header.innerHTML = `<h1>Properties For Sale In ${suburb}</h1>`
// }

// filterBySuburb();


// function filterAll(){
//     let checkBox = document.getElementsByTagName("input")
//     let filteredList = []
//     let checkedBox = [];
//     for (index=2; index<checkBox.length;index++){
//         if (checkBox[index].checked) {
//             checkedBox.push(checkBox[index].value)
//         }       
//     }
//     if (checkedBox.length == 3){
//         filterBySuburb();
//     }
//     else{
//         for (index=0; index<checkedBox.length;index++){
//             fetch("https://desolate-retreat-38151.herokuapp.com/property-by-type/"+checkedBox[index]+"/", {
//                 method: "get",
//             })
//             .then((res) => res.json())
//             .then((json) => {
//                 arrProp = json.data  
//                 for (i=0; i<arrProp.length;i++){
//                     filteredList.push(arrProp[i])
//                     displayProperty(filteredList)
//                 }
//             })
//         }
//         console.log(filteredList)
//     }   
// }