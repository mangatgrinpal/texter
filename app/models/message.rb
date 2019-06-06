class Message < ApplicationRecord
	validates :body, presence: true

	belongs_to :user
	has_many :message_recipients
	has_many :contacts, through: :message_recipients

	scope :recent, -> {
		where("created_at > ?", Time.now-7.days)
	}

	scope :sorted_desc, -> {
		order("created_at DESC")
	}

end
