require 'excon'


class Api::TonesController < ApplicationController

  def create

    tweet = params[:tweet]


      response = Excon.post("https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&tones=emotion",
      body: "{\"text\": \"#{tweet['text']}\"}",
      headers: {"Content-Type": "application/json"},
      user: ENV['ibm_user'],
      password: ENV['ibm_password']
      )
      scores = JSON.parse(response.body)

      if scores["document_tone"]
        tones = scores["document_tone"]["tone_categories"][0]['tones']
        scores = {anger: tones[0], disgust: tones[1], fear: tones[2], joy: tones[3], sadness: tones[4]}
      else
        scores = "Unavailable"
      end
      @scores = scores


    render 'api/tones/tones'
  end

end
