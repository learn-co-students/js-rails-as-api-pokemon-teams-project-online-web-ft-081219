class TrainersController < ApplicationController
    before_action :find_trainer, only: [:show, :update, :destroy]

    def index
        trainers = Trainer.all
        render json: trainers.to_json(:include => {
                    :pokemons => {:only => [:nickname, :species]}
                    }, :except => [:updated_at])
    end
    
    def show

    end

    def create
        @trainer = Trainer.create(trainer_params)
        if @trainer.save
            render json: @trainer
        else
            render json: {errors: @trainer.errors.full_messages}
        end
    end

    def update
        if @trainer.update(trainer_params)
            render json: @trainer
        else
            render json: {errors: @trainer.errors.full_messages}
        end
    end

    def destroy
        @trainer.destroy
        render json: @trainer
    end

    private
    def find_trainer
        @trainer = Trainer.find_by(id: params[:id])
    end

    def trainer_params
        params.require(:trainers).permit(:name, pokemons:[:nickname, :species])
    end 
end
