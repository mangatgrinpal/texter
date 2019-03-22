Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#home'

  resources :contacts
  
  get '/dashboard', to: 'static_pages#dashboard'
end
