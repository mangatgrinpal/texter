class ContactSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :first_name, :last_name
end
