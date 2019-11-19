require "pry"
class PokemonsController < ApplicationController
    # name = Faker::Name.first_name
    # species = Faker::Games::Pokemon.name
    # Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)

    # t.string "species"
    # t.string "nickname"
    # t.integer "trainer_id"
    # t.datetime "created_at", null: false
    # t.datetime "updated_at", null: false
    # t.index ["trainer_id"], name: "index_pokemons_on_trainer_id"
    
    def create 
        # binding.pry
        trainer = Trainer.find_by(id: params["trainer_id"])
        if trainer.pokemons.length < 6
           new_pokemon =  Pokemon.create(nickname: Faker:: Name.first_name, species: Faker::Games::Pokemon.name)
           trainer.pokemons << new_pokemon

           render json: new_pokemon
        else 
            render json: {error:  "You can not have more than 6 pokemons"}
        end
    end

    def destroy
        # binding.pry
        pok = Pokemon.find_by(id: params["pokemon_id"])
        pok.delete
       render json: {resp: "deleted"}
    end
end
