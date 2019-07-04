class StaticPagesController < ApplicationController
	before_action :authenticate_user!, only: [:dashboard]
  before_action :find_user

  

	
  def home
  end

  def dashboard
  	
  	@user_contacts = serialized_contacts

    @user_groups = ActiveModel::Serializer::CollectionSerializer.new(@user.groups, each_serializer: GroupSerializer)
    
  	@recent_messages = serialized_messages

    

    
  end

  def terms
  end

  private

  def find_user
    @user = current_user
  end

  def serialized_contacts
    ActiveModel::Serializer::CollectionSerializer.new(@user.contacts.order('last_name ASC'), each_serializer: ContactSerializer)
  end

  def serialized_messages
    ActiveModel::Serializer::CollectionSerializer.new(@user.messages.recent.sorted_desc, each_serializer: MessageSerializer)
  end
  
end