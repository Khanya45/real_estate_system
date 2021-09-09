function filterBySuburb(){
  let suburb = document.querySelector("input").value
  localStorage.filterSuburb = suburb;
  let arrProperties =  JSON.parse(localStorage.getItem("filter_listing_type")).filter(property=>{
    return property[6].toLowerCase().includes(suburb.toLowerCase())
  })
  localStorage.filterBySuburb = JSON.stringify(arrProperties);
}

function filterByBuy(){
  fetch("https://desolate-retreat-38151.herokuapp.com/property-by-listingtype/sale/", {
    method: "get",
    })
  .then((response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then((json) => {
    console.log(json.data)
    localStorage.filter_listing_type = JSON.stringify(json.data)
  }).catch(error => {
    alert(error)
  })
}

function filterByRent(){
  fetch("https://desolate-retreat-38151.herokuapp.com/property-by-listingtype/rental/", {
    method: "get",
    })
  .then((response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then((json) => {
    console.log(json.data)
    localStorage.filter_listing_type = JSON.stringify(json.data)
  }).catch(error => {
    alert(error)
  })
}
