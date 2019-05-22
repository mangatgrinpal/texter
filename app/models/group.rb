class Group < ApplicationRecord
	belongs_to :user
	has_many :group_members
	has_many :contacts, through: :group_members
	

end
