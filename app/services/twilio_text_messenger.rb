class TwilioTextMessenger
	attr_reader :message

	def initialize(recipient, message)
		@recipient = recipient
		@message = message
	end

	def call
		client = Twilio::REST::Client.new
		client.messages.create({
			from: ENV["twilio_phone_number"],
			to: @recipient,
			body: @message
		})
	end

end