class MessageRecipientSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :message
  belongs_to :contact
end
