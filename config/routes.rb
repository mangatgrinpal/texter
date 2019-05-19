Rails.application.routes.draw do
  get 'groups/create'
  get 'groups/destroy'
  devise_for :users, controllers: { registrations: 'users/registrations' }

  root 'static_pages#home'

  resources :contacts

  resources :messages

  resources :groups
  
  get '/dashboard', to: 'static_pages#dashboard'

  get '/terms', to: 'static_pages#terms'
end
