class Api::TwitterController < ApplicationController

  def index

    client = Twitter::REST::Client.new do |config|
      config.consumer_key = ENV['consumer_api_key']
      config.consumer_secret = ENV['consumer_api_secret']
      config.access_token = ENV['access_token']
      config.access_token_secret = ENV['access_token_secret']
    end

    search_options = {
      result_type: "recent",
      # geocode: "40.730610,-73.935242,10mi"
    }

    search = client.search("#freebeer -rt").take(10).each do |tweet|
        debugger
    end

  end
end
