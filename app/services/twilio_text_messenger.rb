class TwilioTextMessenger
	attr_reader :message

	def initialize(recipients, message)
		@recipients = recipients
		@message = message
	end

	

	def send_notification
		@client = Twilio::REST::Client.new
		@service = @client.notify.v1.services(ENV["twilio_service_sid"])


		@service.notifications.create(

			to_binding: recipients_to_binding,
			body: @message
			)
		
	end

	private

	def recipients_to_binding
		solution = []
		@recipients.map do |recipient|
			'{"binding_type":"sms", "address":"+1' + recipient["phone_number"] + '"}'
		end

		
	end

end