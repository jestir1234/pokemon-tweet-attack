Rails.application.routes.draw do
  root to: 'static_pages#index'

  namespace :api, default: {format: :json} do
    resources :twitter, only: [:index]
  end
end
