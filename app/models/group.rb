class Group < ApplicationRecord
	validates :nickname, presence: true

	belongs_to :user
	has_many :group_members, dependent: :destroy
	has_many :contacts, through: :group_members
	

end
