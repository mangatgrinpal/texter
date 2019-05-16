class Message < ApplicationRecord
	belongs_to :user
	has_many :message_recipients
	has_many :contacts, through: :message_recipients

end
