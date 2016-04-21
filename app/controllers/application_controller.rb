class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
 #  protect_from_forgery with: :exception
 #  before_filter :configure_permitted_parameters, if: :devise_controller?

	# protected

 #  def configure_permitted_parameters
 #    devise_parameter_sanitizer.for(:sign_up) << :name
 #    devise_parameter_sanitizer.for(:account_update) << :name
 #  end
 protect_from_forgery with: :exception
  include SessionsHelper


  def check_login
  	if ApplicationHelper.user_logged?(session)
  		return 
  	else
			redirect_to users_login_path
  	end	
	end
end
