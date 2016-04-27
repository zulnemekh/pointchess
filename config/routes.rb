Reddit::Application.routes.draw do
  # get "users/new"
  # get "sessions/new"
  # get "problempanel/new"
  # get "problempanel/show"
  # get "problempanel/index"
  # get "problempanel/edit"

  get "/admin/tactics(.:format)"            => "tactics#index",    :as => "tactics"
  get "/admin/tactics/datainsert(.:format)"        => "tactics#datainsert",      :as => "tactics_datainsert"
  get "/admin/tactics/:id/edit(.:format)"   => "tactics#edit",     :as => "edit_tactics"
  patch "/admin/tactics/update(.:format)"   => "tactics#update",     :as => "update_tactics"
  post "/admin/tactics/create(.:format)"   => "tactics#create",     :as => "create_tactics"

  get "/tactics/tactic(.:format)"            => "tactics#tactic",    :as => "tactic_tactics"
  get "/tactics/tacticthree(.:format)"            => "tactics#tactic_three",    :as => "tactic_tactics_three"
  get "/tactics/tacticfour(.:format)"            => "tactics#tactic_four",    :as => "tactic_tactics_four"

  get "/tactics/elo_rating"            => "tactics#elo_rating",    :as => "tactic_elo_rating"
  #Baazaas tactics filterlej awah
  post "/tactics_ajax"       => "tactics#tactics_ajax",        :as => "tactics_ajax"
  #FILE-unshsan data-gaa data baazruu bicheh 
  post "/tactics_update_ajax"       => "tactics#tactics_update_ajax",        :as => "tactics_update_ajax"

  get "/problempanel(.:format)"            => "problempanel#index",    :as => "problempanel"
  get "/problempanel/new(.:format)"        => "problempanel#new",      :as => "new_problempanel"
  
  get "/problempanel/:id/edit(.:format)"   => "problempanel#edit",     :as => "edit_problempanel"
  patch "/problempanel/update(.:format)"   => "problempanel#update",     :as => "update_problempanel"
  post "/problempanel/create(.:format)"   => "problempanel#create",     :as => "create_problempanel"
  get "/problempanels/:id(.:format)"        => "problempanel#show",     :as => "show_problempanel"


  get "tournament" => "tournament#index", :as => "tournament_index"
  get "tournament/battle" => "tournament#battle", :as => "tournament_battle"
  #dbSrvc.js ajax
  get 'api/tournament/get_user'    => 'tournament#get_user'
  get 'api/tournament/get_tactic'    => 'tournament#get_tactic'
  post "api/tournament/log" => "tournament#log"
  get "api/tournament/log" => "tournament#log"
  post 'api/tournament/get_tournament_users'    => 'tournament#get_tournament_users'
  
  #dbSrvc.js ajax for tactics
  post "api/tactics/update_rating" => "tactics#update_rating"
  # resources :problempanel
  resources :problems

  resources :trains

  resources :comments


  root to:  "trains#computerplay"
  get "play" => "trains#computerplay", :as => "trains_computerplay"
  get "playpiece" => "trains#computer_not_piece", :as => "trains_computer_not_piece"
  post "/playcenter(.:format)" => "trains#playcenter", :as => :trains_playcenter
  get "pgnviewer" => "trains#pgnviewer", :as => "trains_pgnviewer"
  get "fenpuzzle" => "problems#fenpuzzle", :as => "problems_fenpuzzle"
  get "analyse" => "trains#analyse", :as => "trains_analyse"
  get "bootstrap" => "trains#bootstrap", :as => "trains_bootstrap"
  get "playgame" => "trains#playgame", :as => "trains_playgame"

  get "pgnanalyse" => "problems#pgnanalyse", :as => "problems_pgnanalyse"
  get "mqtt" => "problems#mqtt", :as => "problems_mqtt"

  get    'signup'  => 'users#new' , :as => "signup"
  post  "/user/create(.:format)"   => "users#create",     :as => "create_user"
  get    'login'   => 'sessions#new', :as => "users_login"
  post   'login'   => 'sessions#create'
  get    'logout'  => 'sessions#destroy',:as => "users_logout"
  resources :users
end

