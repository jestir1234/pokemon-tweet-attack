require 'json'

class Api::PokemonController < ApplicationController

  def create

    pokemon_objects = params[:pokemon]

    @pokemon = []
    (0...150).each do |num|
      id = num.to_s
      name = pokemon_objects[id]["name"]
      url = pokemon_objects[id]['url']
      image_url = "/pokemon_images/#{num + 1}.png"
      gif_url = "https://img.pokemondb.net/sprites/black-white/anim/normal/#{name}.gif"
      @pokemon << {'name' => name, 'url' => url, 'image_url' => image_url, 'gif_url' => gif_url}
    end

    client = Twitter::REST::Client.new do |config|
      config.consumer_key = ENV['consumer_api_key']
      config.consumer_secret = ENV['consumer_api_secret']
      config.access_token = ENV['access_token']
      config.access_token_secret = ENV['access_token_secret']
    end


    search_options = {
      result_type: "recent",
      geocode: "40.730610,-73.935242,1000mi"
    }

    @search_results = {};

    # @pokemon.each do |pokemon|
      # name = pokemon['name']
      # tweets = client.search("#{name} -rt")
      # tweet_count = tweets.count
      # @search_results[name] = {tweet_count: tweet_count, tweets: tweets}
    # end

    render 'api/pokemon/pokemon'
  end

end
