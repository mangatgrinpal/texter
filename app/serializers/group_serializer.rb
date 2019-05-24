class GroupSerializer < ActiveModel::Serializer
  attributes :id, :nickname
  has_many :group_members
  has_many :contacts, through: :group_members
end
