class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :recipients
  belongs_to :user

end
