class Contact < ApplicationRecord
	validates :first_name, presence: true
	validates :last_name, presence: true
	validates :phone_number, presence: true

	belongs_to :user
	has_many :group_members, dependent: :destroy
	
	has_many :groups, through: :group_members
end
