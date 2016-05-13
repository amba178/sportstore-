Rails.application.routes.draw do
  
  root to: 'products#index'
  devise_for :users
  resources :orders 
  resources :products, only: [:index, :update, :create, :show, :destroy]
  match '/', :to => proc {|env| [200, {'Content-Type' => 'text/plain'}, ["Hello world"]] },
             :via => [:get, :post, :put, :delete, :options, :head, :patch]
  
end
