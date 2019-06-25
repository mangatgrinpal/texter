class MessagesController < ApplicationController
	before_action :authenticate_user!
	before_action :find_user

	def show
		@message = Message.find(params[:id])
		render json: @message
	end
	
	def create
		@message = current_user.messages.build(message_params)

		@recipients = params[:recipients]
		@recipients.each do |recipient|
			full_name = recipient["first_name"] + " " + recipient["last_name"]
			@message.recipients << (full_name)
		end

		#if the message saves
		if @message.save
			#created join records for each of the recipients
			@recipients.each do |recipient|
				
				@message.message_recipients.create(contact_id: recipient["id"])
			end
			#then send the text messages

			#TwilioTextMessenger.new(@recipients, @message.body).send_notification
			render json: serialized_messages, status: 200
		else
			render json: serialized_messages, status: 400
		end
	end

	private
	def message_params
		params.require(:message).permit(:body, :recipients)
	end

	def find_user
		@user = current_user
	end

	def serialized_messages
		ActiveModel::Serializer::CollectionSerializer.new(@user.messages.recent.sorted_desc, each_serializer: MessageSerializer)
	end
end
