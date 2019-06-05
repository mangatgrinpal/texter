class ContactSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :phone_number
  belongs_to :user
  has_many :group_members
  has_many :messages, through: :message_recipients
  has_many :groups, through: :group_members
end
