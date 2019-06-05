class StaticPagesController < ApplicationController
	before_action :authenticate_user!, only: [:dashboard]
  before_action :find_user

  

	
  def home
  end

  def dashboard
  	
  	@user_contacts = @user.contacts.order('last_name ASC')

    @user_groups = ActiveModel::Serializer::CollectionSerializer.new(@user.groups, each_serializer: GroupSerializer)
    
  	@recent_messages = serialized_messages

    @recent_

    
  end

  def terms
  end

  private

  def find_user
    @user = current_user
  end

  def serialized_messages
    ActiveModel::Serializer::CollectionSerializer.new(@user.messages.sorted_desc, each_serializer: MessageSerializer)
  end
  
end