class GroupSerializer
  include FastJsonapi::ObjectSerializer
  attributes :nickname, :contacts
  
end
