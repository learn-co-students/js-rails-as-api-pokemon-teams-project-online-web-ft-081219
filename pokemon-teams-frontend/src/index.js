const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function () {
    fetchTrainers();

}) //DOMContentLoaded 

function fetchTrainers() {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(postTrainers)
}
const mainCard = document.querySelector("main")

function postTrainers(trainers) {
    trainers.forEach(trainer => {
        let pokString = ""
        trainer.pokemons.forEach(pokemon => {
            pokString += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="140">Release</button></li>`
        })
        mainCard.innerHTML += `
            <div class="card" data-id="1"><p>${trainer.name}</p>
                <button data-trainer-id="1">Add Pokemon</button>
                <ul>
                    ${pokString}
                </ul>
            </div>
        `
    })
}

mainCard.addEventListener("click", e => {
    // debugger

    if (e.target.dataset.trainerId !== undefined) {
        fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    trainer_id: e.target.dataset.trainerId
                })
            })
            .then(resp => resp.json())
            .then(addPokemon)
    }
    if (e.target.dataset.pokemonId !== undefined) {
        e.target.parentElement.remove()
        fetch(POKEMONS_URL + '/' + e.target.pokemonId, {
            method: 'DELETE'
        })
    }
})

function addPokemon(pokemon) {
    // mainCard.children[pokemon.trainer_id - 1].lastElementChild.innerHTML
    let divCard = document.querySelector("div.card ul")
    divCard.innerHTML +=
        `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="140">Release</button></li>`
}