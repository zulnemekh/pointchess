class UsersController < ApplicationController
  def new
  	@user = Base::DtbUserInfo.new
  end

	def create
	  @user = Base::DtbUserInfo.new()

  begin
  	if params[:base_dtb_user_info].present?
	    @user.name = params[:base_dtb_user_info][:name]
		  @user.email = params[:base_dtb_user_info][:email]
		  @user.password = ApplicationHelper.encrypt(params[:base_dtb_user_info][:password])
		  @user.save
		  session[:id]= @user.id
		  redirect_to root_path
		end
  rescue

  end
	  # respond_with(@user)
	end

  def show
    @user = Base::DtbUserInfo.find(params[:id])
  end
end
