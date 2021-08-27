function displayPropertyInfo(){
    let container = document.querySelector(".property_details")
    fetch("https://desolate-retreat-38151.herokuapp.com/get-properties/", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      properties = response.data;
      let property = properties.find((item) => {
        return item[0] == JSON.parse(localStorage.getItem("property_id"));
      });
      container.innerHTML = ""
      container.innerHTML = `
      <div class="img_property">
          <img src="${property[7]}">
      </div>
      <div class="price_type">
        <h3>${property[1]} in ${property[6]}</h3>
        <h3>R${property[3]}</h3>
      </div>
      <div class="property_description">
        <h2>Description</h2>
        <p>${property[2]}</p>
      </div>
      `
      fetch("https://desolate-retreat-38151.herokuapp.com/get-agents/", {
        method: "GET",
        })
    .then((res) => res.json())
    .then((response) => {
        let agents = response.data
        let agent = agents.find((person) => {
            return person[0] == property[4];
        });
        let agent_coontainer = document.querySelector(".call_agent")
        agent_coontainer.innerHTML = `
                <img src="${agent[3]}">
                <h3>${agent[4]}</h3>
                <h3>Agent</h3>
                <h3>${agent[1]}</h3>
                <button>Call Agent</button>
        `
    })
})
}

displayPropertyInfo();

// property_id