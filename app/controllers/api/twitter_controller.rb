class Api::TwitterController < ApplicationController

  def index
    debugger
    client = Twitter::REST::Client.new do |config|
      config.consumer_key = ENV['consumer_api_key']
      config.consumer_secret = ENV['consumer_api_secret']
    end
  end
end
