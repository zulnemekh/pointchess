Reddit::Application.routes.draw do
  # get "users/new"
  # get "sessions/new"
  # get "problempanel/new"
  # get "problempanel/show"
  # get "problempanel/index"
  # get "problempanel/edit"

  get "/tactics(.:format)"            => "tactics#index",    :as => "tactics"
  get "/tactics/datainsert(.:format)"        => "tactics#datainsert",      :as => "tactics_datainsert"
  get "/tactics/:id/edit(.:format)"   => "tactics#edit",     :as => "edit_tactics"
  patch "/tactics/update(.:format)"   => "tactics#update",     :as => "update_tactics"
  post "/tactics/create(.:format)"   => "tactics#create",     :as => "create_tactics"

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


  root to: "problems#fenpuzzle"
  get "play" => "trains#computerplay", :as => "trains_computerplay"
  get "playpiece" => "trains#computer_not_piece", :as => "trains_computer_not_piece"
  post "/playcenter(.:format)" => "trains#playcenter", :as => :trains_playcenter
  get "pgnviewer" => "trains#pgnviewer", :as => "trains_pgnviewer"
  get "fenpuzzle" => "problems#fenpuzzle", :as => "problems_fenpuzzle"
  get "analyse" => "trains#analyse", :as => "trains_analyse"
  get "bootstrap" => "trains#bootstrap", :as => "trains_bootstrap"
  get "playgame" => "trains#playgame", :as => "trains_playgame"

  get "pgnanalyse" => "problems#pgnanalyse", :as => "problems_pgnanalyse"
  

  get    'signup'  => 'users#new' , :as => "signup"
  post  "/user/create(.:format)"   => "users#create",     :as => "create_user"
  get    'login'   => 'sessions#new', :as => "users_login"
  post   'login'   => 'sessions#create'
  get    'logout'  => 'sessions#destroy',:as => "users_logout"
  resources :users
end

