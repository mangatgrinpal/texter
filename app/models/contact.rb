class Contact < ApplicationRecord
	belongs_to :user
	has_many :messages, through: :message_recipients
end
