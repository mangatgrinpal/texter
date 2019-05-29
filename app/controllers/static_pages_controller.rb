class StaticPagesController < ApplicationController
	before_action :authenticate_user!, only: [:dashboard]
  before_action :find_user

  

	
  def home
  end

  def dashboard
  	
  	@user_contacts = @user.contacts

    @user_groups = ActiveModel::Serializer::CollectionSerializer.new(@user.groups, each_serializer: GroupSerializer)
    

  	@recent_messages = @user.messages.where(created_at: 1.week.ago..Date.today)

    
  end

  def terms
  end

  private

  def find_user
    @user = current_user
  end
  
end