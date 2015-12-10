class SessionsController < ApplicationController
  def new
  end

  def create
     user = Base::DtbUserInfo.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
    	raise "gg"
      # Log the user in and redirect to the user's show page.
    else
      flash[:danger] = 'Invalid email/password combination' # Not quite right!
      render 'new'
    end
  end

  def destroy
  end
end
