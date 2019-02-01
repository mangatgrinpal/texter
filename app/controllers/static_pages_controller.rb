class StaticPagesController < ApplicationController
	before_action :authenticate_user!, only: [:dashboard]
	
  def home
  end

  def dashboard
  	@user = current_user
  	@user_contacts = @user.contacts
  end
end