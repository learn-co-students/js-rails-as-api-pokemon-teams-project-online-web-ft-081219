const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')
function renderTrainer(trainer) {

  const div = document.createElement('div')
  div.className = 'card'
  div.dataset.id = trainer.id
  div.innerHTML = `
    <p>${trainer.name}</p>
    <button data-trainer-id=${trainer.id}>Add Pokemon</button>
    <ul>
    </ul>
  `
  main.appendChild(div)
}

function addNewPokemon(id) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({trainer_id: id})
  }

  fetch(`${POKEMONS_URL}`, options)
  .then(resp => resp.json())
  .then(addNewPokeHtml)
}

main.addEventListener('click', e => {
  e.preventDefault()
  if (e.target.className === "release" ) {
    releasePokemon(e.target.dataset.pokemonId)
    e.target.parentElement.remove()
  }

  if (e.target.dataset.trainerId) {
    let id = parseInt(e.target.dataset.trainerId)
    addNewPokemon(id)
  }
})

function addPokemonHtml(pokemon) {
  return `
  <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>
  `
}
function addNewPokeHtml(pokemon) {
  let ulp = document.querySelector(`div[data-id="${pokemon.trainer_id}"] ul`)  
  ulp.innerHTML += `
  <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>
  `
}

function getTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainers => addTrainer(trainers))
}

function addTrainer(trainers) {
  trainers.forEach(renderTrainer)
}

function getPokemon() {
  fetch(POKEMONS_URL)
  .then(resp => resp.json())
  .then(pokemons => addPokemon(pokemons))
}

function addPokemon(pokemons) {
  pokemons.forEach(pokemon => {

     let ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"] ul`)
     ul.innerHTML += addPokemonHtml(pokemon)
  })
}

function releasePokemon(id) {
  // debugger
  const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
       // body: JSON.stringify({pokemon_id: id})
    }
   fetch(`${POKEMONS_URL}/${id}/`,params)
   .then(resp => resp.json())
   .then(console.log)
}



getTrainers();
getPokemon()
