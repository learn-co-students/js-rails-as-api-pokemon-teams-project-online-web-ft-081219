const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded",()=>{
    // get_pokemons will find all the trainers  and their pokemon
    get_pokemons()

    //add eventListener on all the buttons

   
})


// defining the functions
function get_pokemons(){
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    fetch(TRAINERS_URL,params)
    .then(resp => { if(!resp.ok){throw resp};return resp.json()})
    .then (json => append_to_html(json))
    .catch (e => console.log(e))
}

function append_to_html(obj){
    const main = document.querySelector("main")
    obj["data"].forEach(e => {

       let trainer =  e["attributes"]["name"]
       let trainer_id = e["id"]
       let div = document.createElement("div")
       div.classList = "card"
       let att = document.createAttribute("data-id")
       att.value = `${trainer_id}`
        div.setAttributeNode(att)
        div.innerHTML = `<p>${trainer}</p><button  data-trainer-id=${trainer_id}>Add pokemon</button> <ul class = 'pokemons' data-trainer-id='${trainer_id}'></ul>`

       main.appendChild(div)

       let pokemons = e["attributes"]["pokemons"]
       pokemons.forEach(pokemon => {
           new_list = document.createElement("li")
           new_list.innerHTML = `${pokemon["nickname"]}(${pokemon["species"]}) <button class = 'release' data-pokemon-id= ${pokemon["id"]}>release</button>`

         document.querySelector(`ul[data-trainer-id = '${trainer_id}']`).appendChild(new_list)
       })

    })

    const add_buttons = document.querySelectorAll("button[data-trainer-id]")

   const release_buttons = document.querySelectorAll("button[data-pokemon-id]")
    
   add_buttons.forEach(e => {
       e.addEventListener("click", () => {
        add_a_new_pokemon(e.getAttribute('data-trainer-id'))

       })
   })

   release_buttons.forEach(e => {
        e.addEventListener("click", () => {
            e.parentNode.remove()
            release_pokemon(e.getAttribute('data-pokemon-id'))
        })
    })
}
function add_pokemon(id){
   
}

function add_a_new_pokemon(id){
    params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
       body: JSON.stringify({trainer_id: id})
    }
   fetch(`${POKEMONS_URL}`,params)
   .then(resp => {return resp.json()})
   .then(json => {if(json.error ){throw json};append_new_pok_to_html(json)})
   .catch(e => alert(e.error))

}

function append_new_pok_to_html (obj){
   let ul =  document.querySelector(`ul[data-trainer-id = '${obj["trainer_id"]}']`)
    let li = document.createElement("li")
    li.innerHTML = `${obj["nickname"]}(${obj["species"]}) <button class = 'release' data-pokemon-id= ${obj["id"]}>release</button>`
    
    ul.appendChild(li)
    let release =   document.querySelector(`button[data-pokemon-id='${obj["id"]}']`)
    release.addEventListener("click", ()=>{
        release.parentNode.remove()
        release_pokemon(release.getAttribute('data-pokemon-id'))

    })

}

function release_pokemon(id){
    params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
       body: JSON.stringify({pokemon_id: id})
    }
   fetch(`${POKEMONS_URL}/${id}/`,params)  
   .then(resp => {return resp.json()})
   .then(json => console.log(json.resp))
}