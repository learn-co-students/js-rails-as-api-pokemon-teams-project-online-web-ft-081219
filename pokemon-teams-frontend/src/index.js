const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
  loadTrainers();  
});

function loadTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainers => {
    for (const trainer of trainers) {
      document.querySelector('main').appendChild(makeTrainerCard(trainer));
      // console.log(tra iner.pokemons)
    };
    // console.log(trainers[0].pokemons)
  })
};

function makeTrainerCard(trainer) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-id', `${trainer.id}`);

  const name = document.createElement('p');
  name.innerText = trainer.name;
  card.appendChild(name);

  card.appendChild(addButton(trainer));

  card.appendChild(pokemonList(trainer.pokemons));

  return card;
}

function addButton(trainer) {
  const addBut = document.createElement('button');
  addBut.setAttribute('data-trainer-id', `${trainer.id}`);
  addBut.innerText = 'Add Pokemon';
  addBut.addEventListener('click', () => {
    addPokemon(trainer);
  });

  return addBut;
};

function pokemonList(pokemons) {
  const list = document.createElement('ul');
  for (const pokemon of pokemons) {
    list.appendChild(makeListItem(pokemon));
  };
  return list;
}

function makeListItem(pokemon) {
  const listItem = document.createElement('li');
  listItem.innerText = `${pokemon.nickname} (${pokemon.species})`;
  
  const releaseButton = document.createElement('button');
  releaseButton.innerText = 'Release';
  releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`);
  releaseButton.classList.add('release');
  releaseButton.addEventListener ('click', () => {
    releasePokemon(pokemon);
  });
  listItem.appendChild(releaseButton);
  return listItem;
}

function releasePokemon(pokemon) {
  const listItem = document.querySelector(`[data-pokemon-id="${pokemon.id}"]`).parentNode;
  const configObj = {
    method: 'DELETE',
  };

  fetch(`${POKEMONS_URL}/${pokemon.id}`, configObj)
  .then(resp => resp.json())
  .then(() => {
    listItem.parentNode.removeChild(listItem);
  });
}

function addPokemon(trainer) {
  const trainerHas = trainer.pokemons.length;
  const pokemonList = document.querySelector(`[data-id='${trainer.id}'] ul`);
  const listHas = pokemonList.childElementCount;
  
  try {
    if ( listHas >= 6) throw `${trainer.name} already has 6 Pokemon!`
  } catch(error) {
    alert(error);
    return
  };
  
  const configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({'trainer_id': trainer.id}),
  };

  fetch(POKEMONS_URL, configObj)
  .then(resp => resp.json())
  .then(obj => {
    pokemonList.appendChild(makeListItem(obj))
  });
}