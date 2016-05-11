Rails.application.routes.draw do
  
  root to: 'products#index'
  devise_for :users
  resources :products, only: [:index]

  resources :orders, only: [:index, :show, :update, :create]
  
end
