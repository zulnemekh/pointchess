Reddit::Application.routes.draw do
  get "tournament/index"
  get "tournament/battle"
  
  resources :problems

  resources :trains

  resources :comments

  devise_for :users
  resources :links do
    member do
      put "like", to: "links#upvote"
      put "dislike", to: "links#downvote"
    end
    resources :comments
  end

  root to: "links#index"
  get "play" => "trains#computerplay", :as => "trains_computerplay"
  post "/playcenter(.:format)" => "trains#playcenter", :as => :trains_playcenter
  get "pgnviewer" => "trains#pgnviewer", :as => "trains_pgnviewer"
  get "fenpuzzle" => "problems#fenpuzzle", :as => "problems_fenpuzzle"
  get "analyse" => "trains#analyse", :as => "trains_analyse"
  get "bootstrap" => "trains#bootstrap", :as => "trains_bootstrap"
  get "playgame" => "trains#playgame", :as => "trains_playgame"

  get "pgnanalyse" => "problems#pgnanalyse", :as => "problems_pgnanalyse"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end
  
  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

