class SessionsController < ApplicationController
  def new

    @users = Base::DtbUserInfo.all
  end

  def create
     # user = Base::DtbUserInfo.find_by(email: params[:session][:email].downcase)
      @user = Base::DtbUserInfo.authenticate(params[:session][:email].downcase, params[:session][:password].to_s)
    if @user 
      # Log the user in and redirect to the user's show page.
      session[:id]= @user.id
      redirect_to root_path
    else
      flash[:danger] = 'Invalid email/password combination' # Not quite right!
      render 'new'
    end
  end

  def destroy
    session[:id] = nil
    #session.delete(:user_id)
    cookies.delete(:auto_login)
    reset_session
    
    redirect_to root_path

  end
end
