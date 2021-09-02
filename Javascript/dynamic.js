
function filterBySuburb(){
  let suburb = document.querySelector("input").value
  localStorage.filterSuburb = suburb;

}

function filterByBuy(){
  if(document.getElementById('btnBuy').clicked == true)
  {
     alert("button was clicked");
  }
}


function filterByRent(){
  if(document.getElementById('btnRent').clicked == true)
  {
     alert("button was clicked");
  }
}