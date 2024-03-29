let arrProperties = [];
let suburb = localStorage.getItem("filterSuburb");
let filteredBySuburb = JSON.parse(localStorage.getItem("filterBySuburb"));

// ========================= DISPLAYING PROPERTIES FILTERD BY SUBURB ==========================
function displayProperty(arrProperty) {
  let header = document.querySelector("#property_header");
  header.innerHTML = "";
  header.innerHTML = `<h1>Properties For Sale In ${suburb}</h1>`;

  let container = document.querySelector(".property_container");
  container.innerHTML = "";
  container.innerHTML = `
    <div class="sort">
        <h3>Sort By:</h3>
        <button onclick="sortByDate()">Newest</button>
        <button onclick="sortByLowPrice()">Lowest Price</button>
        <button onclick="sortByHighPrice()">Highest Price</button>
    </div>
    `;
  arrProperty.forEach((property) => {
    container.innerHTML += `
      <div class="property_card">
        <div class="img_property" onclick="redirectToInfo(${property[0]})">
            <img src="${property[7]}">
        </div>
        <div class="property_info" onclick="redirectToInfo(${property[0]})">
            <h4>${property[1].trim().slice(6, property[1].length)}</h4>
            <h4>R${property[3]}</h4>
            <h4>${property[6].trim().slice(0, 20)}...</h4>
            <h4>${property[9]}</h4>
        </div>
        <div id="heart_icon">
            <i onclick="likeIcon()" class="far fa-heart"></i>
        </div>
      </div>
      `;
  });
}

displayProperty(filteredBySuburb);

// ========================= DISPLAYING PROPERTIES FILTERD BY Property Type ==========================

function filterPropertyType() {
  let checkBox = document.getElementsByTagName("input");
  let checkedBox = [];
  let filteredList = [];
  for (index = 0; index < checkBox.length; index++) {
    if (checkBox[index].checked) {
      checkedBox.push(checkBox[index].value);
    }
  }
  // console.log(checkedBox);
  if (checkedBox.length == 3) {
    displayProperty(filteredBySuburb);
  } else {
    for (index = 0; index < checkedBox.length; index++) {
      let filteredByPropertyType = filteredBySuburb.filter((property) => {
        return property[1] == checkedBox[index];
      });
      // console.log(filteredByPropertyType)
      for (i = 0; i < filteredByPropertyType.length; i++) {
        filteredList.push(filteredByPropertyType[i]);
        displayProperty(filteredList);
      }
    }
    // console.log(filteredList)
    localStorage.filteredPropertyType = JSON.stringify(filteredList);
  }
}

function redirectToInfo(id) {
  localStorage.property_id = JSON.stringify(id);
  window.location.replace("/property_det.html");
}
function likeIcon() {
  let container = document.getElementById("heart_icon");
  container.innerHTML = `<i class="fa fa-heart red-color"></i>`;
}

function sortByHighPrice() {
  let properties = JSON.parse(localStorage.getItem("filteredPropertyType"));
  if (filteredBySuburb.length > properties.length) {
    let sortedArray = filteredBySuburb.sort(function (a, b) {
      return b[3] - a[3];
    });
    console.log(sortedArray);
    displayProperty(sortedArray);
  } else {
    let sortedArray = properties.sort(function (a, b) {
      return b[3] - a[3];
    });
    console.log(sortedArray);
    displayProperty(sortedArray);
  }
}

function sortByLowPrice() {
  let properties = JSON.parse(localStorage.getItem("filteredPropertyType"));
  // let properties = JSON.parse(localStorage.getItem("filteredPropertyType"));
  if (filteredBySuburb.length > properties.length) {
    let sortedArray = filteredBySuburb.sort(function (a, b) {
      return a[3] - b[3];
    });
    console.log(sortedArray);
    displayProperty(sortedArray);
  } else {
    let sortedArray = properties.sort(function (a, b) {
      return a[3] - b[3];
    });
    console.log(sortedArray);
    displayProperty(sortedArray);
  }
}

function sortByDate() {
  let properties = JSON.parse(localStorage.getItem("filteredPropertyType"));
  if (filteredBySuburb.length > properties.length) {
    let sortedArray = filteredBySuburb.sort(function (a, b) {
      return a[0] < b[0];
    });
    console.log(sortedArray);
    displayProperty(sortedArray);
  } else {
    let sortedArray = properties.sort(function (a, b) {
      return a[0] < b[0];
    });
    console.log(sortedArray);
    displayProperty(sortedArray);
  }
}
