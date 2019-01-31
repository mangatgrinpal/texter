Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#home'
  
  get '/dashboard', to: 'static_pages#dashboard'
end
