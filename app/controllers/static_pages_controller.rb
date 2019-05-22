class StaticPagesController < ApplicationController
	before_action :authenticate_user!, only: [:dashboard]
	
  def home
  end

  def dashboard
  	@user = current_user
  	@user_contacts = @user.contacts
    parsed = JSON.parse GroupSerializer.new(@user.groups).serialized_json
  	@user_groups = parsed

  	@recent_messages = @user.messages.where(created_at: 1.week.ago..Date.today)

    
  end

  def terms
  end
  
end