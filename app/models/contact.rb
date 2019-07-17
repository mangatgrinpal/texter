class Contact < ApplicationRecord
	validates :first_name, presence: true, length: { maximum: 64 }
	validates :last_name, presence: true, length: { maximum: 64 }
	validates :phone_number, presence: true, length: { maximum: 10 }

	belongs_to :user
	has_many :group_members, dependent: :destroy
	
	has_many :groups, through: :group_members
end
