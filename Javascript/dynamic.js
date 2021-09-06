function filterBySuburb(){
  let suburb = document.querySelector("input").value
  localStorage.filterSuburb = suburb;
  let arrProperties =  JSON.parse(localStorage.getItem("filter_listing_type")).filter(property=>{
    return property[6].includes(suburb)
  })
  localStorage.filterBySuburb = JSON.stringify(arrProperties);
}

function filterByBuy(){
  fetch("https://desolate-retreat-38151.herokuapp.com/property-by-listingtype/sale/", {
    method: "get",
    })
  .then((res) => res.json())
  .then((json) => {
    console.log(json.data)
    localStorage.filter_listing_type = JSON.stringify(json.data)
  })
}

function filterByRent(){
  fetch("https://desolate-retreat-38151.herokuapp.com/property-by-listingtype/rental/", {
    method: "get",
    })
  .then((res) => res.json())
  .then((json) => {
    console.log(json.data)
    localStorage.filter_listing_type = JSON.stringify(json.data)
  })
}
