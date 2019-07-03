class ContactsController < ApplicationController
	before_action :authenticate_user!
	before_action :find_user


	def create
		
		@contact = current_user.contacts.build(contact_params)
		
		if @contact.save
			render json: @user.contacts.order('last_name ASC'), status: 200
		else
			render json: {}, status: 400
		end
	end

	def destroy
		@contact = Contact.find(params[:id])
		
		@contact.destroy
		render json: {userContacts: serialized_contacts, recentMessages: serialized_messages}, status: 200
	end

	private
	
	def find_user
		@user = current_user
	end

	def contact_params
		params.require(:contact).permit(:first_name, :last_name, :phone_number)
	end

	def serialized_contacts
    ActiveModel::Serializer::CollectionSerializer.new(@user.contacts.order('last_name ASC'), each_serializer: MessageSerializer)
  end

	def serialized_messages
    ActiveModel::Serializer::CollectionSerializer.new(@user.messages.sorted_desc, each_serializer: MessageSerializer)
  end
end
