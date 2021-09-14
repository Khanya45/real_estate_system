function displayAgents() {
  fetch("https://desolate-retreat-38151.herokuapp.com/get-agents/", {
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
      arrAgents = json.data;
      console.log(arrAgents);
      let container = document.querySelector(".agent_container");
      container.innerHTML = "";
      arrAgents.forEach((agent) => {
        fetch(
          `https://desolate-retreat-38151.herokuapp.com/get-listings/${agent[0]}/`,
          {
            method: "get",
          }
        )
          .then((res) => res.json())
          .then((json) => {
            let listings = json;
            container.innerHTML += `
                    <div class="agent_card">
                        <div class="agent_img">
                            <img src="${agent[3]}">
                        </div>
                        <div class="agent_info">
                            <h3>${agent[4]}</h3>
                            <div class="agent_listings">
                                <h3>Sale listings:${listings["sale_listing"]}</h3>
                                <h3>Rental listings:${listings["rental_listing"]}</h3>
                            </div>
                            <h3>${agent[2]}</h3>
                            <h3>${agent[1]}</h3>
                            <div class="get_agent_btn">
                                <button onclick="send_email(${agent[0]})">Get Agent</button>
                            </div>
                        </div>
                    </div>  `;
          });
      });
    })
    .catch((error) => {
      alert(error);
    });
}

displayAgents();
loggedUser = JSON.parse(localStorage.getItem("loggedIn"));

function send_email(id) {
  new_property = JSON.parse(localStorage.getItem("listed_property"));
  new_property.agent_id = id;
  new_property.user_id = loggedUser[0];
  fetch("https://desolate-retreat-38151.herokuapp.com/add_property/", {
    method: "POST",
    body: JSON.stringify(new_property),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((json) => {
      if ((json["status_code"] = 201)) {
        window.location.replace("/Javascript/agentMsg.html");
        localStorage.agent_id = JSON.stringify(id);
      }
    })
    .catch((error) => {
      alert(error);
    });
}
