class StaticPagesController < ApplicationController
	before_action :authenticate_user!, only: [:dashboard]
	
  def home
  end

  def dashboard
  	@user = current_user
  	@user_contacts = @user.contacts
  	@recent_messages = @user.messages.where(created_at: 1.week.ago..Date.today)
  end
end