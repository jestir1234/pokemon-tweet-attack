class Api::TwitterController < ApplicationController

  def create

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

    pokemon = params[:pokemon]

    name = pokemon['name']
    tweets = client.search("#{name} -rt").take(50)
    tweet_count = tweets.count
    @tweets = {tweet_count: tweet_count, tweets: tweets}


    render 'api/twitter/twitter'
  end
end
