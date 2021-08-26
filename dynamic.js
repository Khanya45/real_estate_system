function displayProperty(arrProperty){
  let container = document.getElementsByClassName("property_container")
  console.log(container)
  arrProperty.forEach(property => {   
    container.innerHTML += `
    <div class="property_card">
      <div class="img_property">
          <img src="${arrProperty[7]}">
      </div>
      <div class="property_info">
          <h4>${arrProperty[1]}</h4>
          <h4>${arrProperty[3]}</h4>
          <h4>${arrProperty[6]}</h4>
          <h4>${arrProperty[9]}</h4>
      </div>
      <div id="heart_icon">
          <i class="fa fa-heart red-color"></i>
      </div>
    </div>
    
    `
  });
}



function filterBySuburb(){
  let suburb = document.querySelector("input").value
  fetch("https://desolate-retreat-38151.herokuapp.com/property-by-suburb/"+suburb+"/", {
    method: "get",
  })
    .then((res) => res.json())
    .then((json) => {
      displayProperty(json.data)
    })
}