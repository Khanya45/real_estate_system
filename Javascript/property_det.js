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
        let form_container = document.querySelector(".contact-form")
        let agent_coontainer = document.querySelector(".call_agent")
        form_container.innerHTML = `
        <div id="heading">
        <label>Contact Agent</label>
    </div>
    <div>
        <input
            type="text"
            required
            placeholder="Enter your fullname"
            class="contact-info"
        />
        </label>
    </div>
    <div>
        
        <!-- Surname: -->
        <input
            class="contact-info"
            type="surname"
            name="surname"
            id="surname"
            required
            placeholder="Enter your phone number"
        />
        </label>
    </div>
    <div>
        <label for="email">
        <!-- Your email: -->
        <input
            class="contact-info"
            type="email"
            name="_replyto"
            id="email"
            required
            placeholder="Enter your email"
        />
        </label>
    </div>
    <div>
        <label for="message">
        <!-- Your message: -->
        <textarea
            name="message"
            id="text-box"
            placeholder="Enter your message"
        ></textarea>
        </label>
    </div>   
    <button onclick="send_email(${agent[0]})" id="submit-btn">Email Agent</button>`
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


function send_email(id){
  info = []
  let inputs = document.getElementsByTagName("input")
  for (index=0;index<inputs.length;index++){
     info.push(inputs[index].value)
  }
  let textarea = document.getElementById("text-box").value
  body = `I, ${info[0]}\n ${textarea} \n Here my contacts:\n Mobile:${info[1]}\n email:${info[2]}`
  // console.log(JSON.stringify(body))
  fetch("http://127.0.0.1:5002/send-email/"+id+"/"+body+"/", {
        method: "POST",
        body: info[2],
        headers: {
          "Content-type": "application/json; charset=UTF-8",
      },
        })
    .then((res) => res.json())
    .then((response) => {
      console.log(response.data)
    })
}