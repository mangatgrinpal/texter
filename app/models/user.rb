class User < ApplicationRecord
  validates :email, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true

	has_many :contacts
	has_many :messages
	has_many :groups
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: [:google_oauth2]

  def self.from_omniauth(auth)
  	# Either create a User record or update it based on the provider (Google) and the UID

  	where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name

  		user.token = auth.credentials.token
  		user.expires = auth.credentials.expires
  		user.expires_at = auth.credentials.expires_at
  		user.refresh_token = auth.credentials.refresh_token
  	end
  end
end
