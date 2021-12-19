Rails.application.routes.draw do
  root to: 'calendar#index'

  get '/calendar(/:year)(/:month)', to: 'calendar#index'
  
  namespace :api, defaults: { format: :json }, path: '/api' do
    namespace :v1 do
      resources :reminders, only: [:edit, :create, :update, :destroy]
    end
  end
end
