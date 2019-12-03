class PokemonsController < ApplicationController
  def index
  end
  
  def show
    pokemon = Pokemon.find(params[:id])
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def create
    raise Exception.new('something happened') if Trainer.find(params[:trainer_id]).pokemons.length >= 6

    pokemon = Pokemon.create(
      nickname: Faker::Name.first_name,
      species: Faker::Games::Pokemon.name,
      trainer_id: params[:trainer_id]
    )
    pokemon_ser = PokemonSerializer.new(pokemon).to_serialized_json
    render json: pokemon_ser
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon_ser = PokemonSerializer.new(pokemon).to_serialized_json
    Pokemon.destroy(params[:id])
    render json: pokemon_ser
  end
end
