class GroupMemberSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :group
  belongs_to :contact
end
