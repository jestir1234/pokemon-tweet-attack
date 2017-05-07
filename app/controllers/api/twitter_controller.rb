class Api::TwitterController < ApplicationController

  def index
    debugger
    client = Twitter::REST::Client.new do |config|
      config.consumer_key = ENV['consumer_api_key']
      config.consumer_secret = ENV['consumer_api_secret']
      config.access_token = ENV['access_token']
      config.access_token_secret = ENV['access_token_secret']
    end
    debugger
  end
end
