Reddit::Application.routes.draw do
  get "users/new"
  get "sessions/new"
  # get "problempanel/new"
  # get "problempanel/show"
  # get "problempanel/index"
  # get "problempanel/edit"
 
  get "/problempanel(.:format)"            => "problempanel#index",    :as => "problempanel"
  get "/problempanel/new(.:format)"        => "problempanel#new",      :as => "new_problempanel"
  
  get "/problempanel/:id/edit(.:format)"   => "problempanel#edit",     :as => "edit_problempanel"
  patch "/problempanel/update(.:format)"   => "problempanel#update",     :as => "update_problempanel"
  post "/problempanel/create(.:format)"   => "problempanel#create",     :as => "create_problempanel"
  get "/problempanels/:id(.:format)"        => "problempanel#show",     :as => "show_problempanel"


  get "tournament" => "tournament#index", :as => "tournament_index"
  get "tournament/battle" => "tournament#battle", :as => "tournament_battle"
  

  # resources :problempanel
  resources :problems

  resources :trains

  resources :comments


  root to: "links#index"
  get "play" => "trains#computerplay", :as => "trains_computerplay"
  post "/playcenter(.:format)" => "trains#playcenter", :as => :trains_playcenter
  get "pgnviewer" => "trains#pgnviewer", :as => "trains_pgnviewer"
  get "fenpuzzle" => "problems#fenpuzzle", :as => "problems_fenpuzzle"
  get "analyse" => "trains#analyse", :as => "trains_analyse"
  get "bootstrap" => "trains#bootstrap", :as => "trains_bootstrap"
  get "playgame" => "trains#playgame", :as => "trains_playgame"

  get "pgnanalyse" => "problems#pgnanalyse", :as => "problems_pgnanalyse"
  

  get    'signup'  => 'users#new'
  get    'login'   => 'sessions#new'
  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'
  resources :users
end

