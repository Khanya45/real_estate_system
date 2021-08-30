function displayAgents(){
    fetch("http://127.0.0.1:5000/get-agents/", {
        method: "get",
        })
        .then((res) => res.json())
        .then((json) => {
            arrAgents= json.data
            console.log(arrAgents)
            let container = document.querySelector(".agent_container")
            container.innerHTML= ""
            arrAgents.forEach(agent=>{
                fetch(`http://127.0.0.1:5000/get-listings/${agent[0]}/`, {
                method: "get",
                })
                .then((res) => res.json())
                .then((json) => {
                    let listings = json
                    container.innerHTML +=`
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
                                <button >Get Agent</button>
                            </div>
                        </div>
                    </div>  `})
            }) 
        })
}

displayAgents();