function send_email(){
    loggedUser = JSON.parse(localStorage.getItem("loggedIn"))
    agent_id = JSON.parse(localStorage.getItem("agent_id"))
    fetch("https://desolate-retreat-38151.herokuapp.com/get-agent-info/"+agent_id+"/", {
        method: "get",
        })
    .then((res) => res.json())
    .then((json) => {
        let agent = json.data
        console.log(agent[1])
        body = `Dear ${loggedUser[1]},\n
                Does it seem like your home will never sell?\n
                Few people truly understand the frustrations you face trying to sell your home. Perhaps you’re in between jobs and\n
                need to start renting. Or maybe you want to buy your next home, but you feel paralyzed because you need to sell this home first.\n
                Maybe you’ve dropped your life savings into this home. And because of the lousy economy or unscrupulous people, you’re\n
                now trying to get your money out. The clock is ticking … and with each tick, you lose more and more of your hard-earned money.\n
                My name is ${agent[0][4]}, and I am a real estate agent at ${agent[0][1]} specializing in difficult-to-sell properties.\n
                In Over 10 Years of Marketing “Hard-to-Sell” Properties, I’ve Learned a Few Things About Why YOUR Home Is NOT Selling …\n
                Each home is different and has special problems that make selling it difficult.It is my pleasure to help you sell your property too'\n
                Sincerely yours,\n
                ${agent[0][4]}` 
        let container = document.querySelector("p")
        container.innerHTML = `<p>${body}</p>`
    })
}

send_email();