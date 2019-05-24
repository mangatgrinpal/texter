class TwilioTextMessenger
	attr_reader :message

	def initialize(recipient, message)
		@recipient = recipient
		@message = message
	end

	def call
		@client = Twilio::REST::Client.new
		@service = @client.notify.v1.services('ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

		@service.notifications.create(
			to_binding: ['{"binding_type":"sms", "address":"+14083349274"}', {"binding_type":"sms", ""}
			],
			body: @message
			)
		
	end

end