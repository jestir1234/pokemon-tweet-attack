Rails.application.routes.draw do
  root to: 'static_pages#index'

  namespace :api, default: {format: :json} do
    resources :twitter, only: [:create]
    resources :pokemon, only: [:create]
    resources :tones, only: [:create]
  end
end
