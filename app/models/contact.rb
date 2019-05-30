class Contact < ApplicationRecord
	belongs_to :user
	has_many :group_members, dependent: :destroy
	has_many :messages, through: :message_recipients
	has_many :groups, through: :group_members
end
