class ContactsController < ApplicationController
	before_action :authenticate_user!

	def create
		@user = current_user
		
		@contact = current_user.contacts.build(contact_params)

		if @contact.save
			render json: @user.contacts, status: 200
		else
			render json: {}, status: 400
		end
	end

	private

	def user_contacts
	end

	def contact_params
		params.require(:contact).permit(:first_name, :last_name, :phone_number)
	end
end
