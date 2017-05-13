require 'json'

class Api::PokemonController < ApplicationController

  def create

    pokemon_objects = params[:pokemon]
    @pokemon = []
    debugger
    (0...150).each do |num|
      id = num.to_s
      name = pokemon_objects[id]["name"]
      url = pokemon_objects[id]['url']
      image_url = "/pokemon_images/#{num + 1}.png"
      gif_url = "https://img.pokemondb.net/sprites/black-white/anim/normal/#{name}.gif"
      @pokemon << {'name' => name, 'url' => url, 'image_url' => image_url, 'gif_url' => gif_url}
    end


    render 'api/pokemon/pokemon'
  end

end
