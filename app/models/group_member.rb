class GroupMember < ApplicationRecord
	belongs_to :contact
	belongs_to :group



	# below here we were trying to sort the groupmembers returned by their last name
	# scope :sorted_desc, -> {
	# 	order("created_at DESC")
	# }
end
