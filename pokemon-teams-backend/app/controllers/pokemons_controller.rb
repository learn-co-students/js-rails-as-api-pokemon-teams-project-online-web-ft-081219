class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons.to_json
  end

  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    pokemon = trainer.pokemons.create(species: Faker::Games::Pokemon.name, nickname: Faker::Name.first_name)

    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    render json: pokemon
    
  end
end
