class MessagesController < ApplicationController
	before_action :authenticate_user!
	before_action :find_user
	
	def create
		@message = current_user.messages.build(message_params)
		@recipients = params[:recipients]

		if @message.save
			TwilioTextMessenger.new(@recipients, @message.body).send_notification
			render json: @user.messages, status: 200
		else
			render json: {}, status: 400
		end
	end

	private
	def message_params
		params.require(:message).permit(:body)
	end

	def find_user
		@user = current_user
	end
end
