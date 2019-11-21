const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')
function trainerHtml(trainer) {
  // debugger;
  return `
  <div class="card" data-id=${trainer.id}>
    <p>${trainer.name}</p>
    <button data-trainer-id=${trainer.id}>Add Pokemon</button>
    <ul>
    </ul>
  </div>
  `
}

function addPokemonHtml(pokemon) {
  return `
  <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>
  `
}

function getTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainers => addTrainer(trainers))
}

function addTrainer(trainers) {
  trainers.forEach(trainer => {
    main.innerHTML += trainerHtml(trainer)
  })
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
getTrainers();
getPokemon()
