Rails.application.routes.draw do
  root to: 'calendar#index'

  get '/calendar(/:year)(/:month)', to: 'calendar#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
