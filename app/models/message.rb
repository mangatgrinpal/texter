class Message < ApplicationRecord
	validates :body, presence: true
	validates :recipients, presence: true

	belongs_to :user


	scope :recent, -> {
		where("created_at > ?", Time.now-7.days)
	}

	scope :sorted_desc, -> {
		order("created_at DESC")
	}

end
