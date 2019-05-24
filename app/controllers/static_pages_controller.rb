class StaticPagesController < ApplicationController
	before_action :authenticate_user!, only: [:dashboard]
  before_action :find_user

  

	
  def home
  end

  def dashboard
  	
  	@user_contacts = @user.contacts

    @user_groups = ActiveModel::Serializer::CollectionSerializer.new(@user.groups, each_serializer: GroupSerializer)
    
    
    
  	@user_group_members = ActiveModel::Serializer::CollectionSerializer.new(user_group_members, each_serializer: GroupMemberSerializer)

  	@recent_messages = @user.messages.where(created_at: 1.week.ago..Date.today)

    
  end

  def terms
  end

  private

  def user_group_members
    @user.groups.map do |group|
      group.group_members
    end
  end

  def find_user
    @user = current_user
  end
  
end