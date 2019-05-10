Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }

  root 'static_pages#home'

  resources :contacts

  resources :messages
  
  get '/dashboard', to: 'static_pages#dashboard'

  get '/terms', to: 'static_pages#terms'
end
