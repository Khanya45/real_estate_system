
function displayAgents(){
    fetch("https://desolate-retreat-38151.herokuapp.com/get-agents/", {
        method: "get",
        })
        .then((res) => res.json())
        .then((json) => {
            arrAgents= json.data
            console.log(arrAgents)
            let container = document.querySelector(".agent_container")
            container.innerHTML= ""
            arrAgents.forEach(agent=>{
                fetch(`https://desolate-retreat-38151.herokuapp.com/get-listings/${agent[0]}/`, {
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
                                <button onclick="send_email(${agent[0]})">Get Agent</button>
                            </div>
                        </div>
                    </div>  `})
            }) 
        })
}   

displayAgents();
loggedUser = JSON.parse(localStorage.getItem("loggedIn"))


function send_email(id){
    window.location.replace("http://127.0.0.1:5501/Javascript/agentMsg.html")
    fetch("https://desolate-retreat-38151.herokuapp.com/get-agent-info/"+id+"/", {
        method: "get",
        })
    .then((res) => res.json())
    .then((json) => {
        let agent = json.data
    body = `Dear ${loggedUser[1]},\n
            Does it seem like your home will never sell?\n
            Few people truly understand the frustrations you face trying to sell your home. Perhaps you’re in between jobs and\n
            need to start renting. Or maybe you want to buy your next home, but you feel paralyzed because you need to sell this home first.\n
            Maybe you’ve dropped your life savings into this home. And because of the lousy economy or unscrupulous people, you’re\n
            now trying to get your money out. The clock is ticking … and with each tick, you lose more and more of your hard-earned money.\n
            My name is ${agent[4]}, and I am a real estate agent at ${agent[1]} specializing in difficult-to-sell properties.\n
            In Over 10 Years of Marketing “Hard-to-Sell” Properties, I’ve Learned a Few Things About Why YOUR Home Is NOT Selling …\n
            Each home is different and has special problems that make selling it difficult.It is my pleasure to help you sell your property too'\n
            Sincerely yours,\n
            ${agent[4]}` 
    let container = document.querySelector("p")
    container.textContent = body
    })
}

