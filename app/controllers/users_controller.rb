class UsersController < ApplicationController
  def new
  end

  def show
    @user = Base::DtbUserInfo.find(params[:id])
  end
end
