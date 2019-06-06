class MessageRecipientSerializer < ActiveModel::Serializer
  attributes :id, :contact
  belongs_to :message
  belongs_to :contact
end
