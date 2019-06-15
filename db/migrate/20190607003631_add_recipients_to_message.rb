class AddRecipientsToMessage < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :recipients, :string, array: true, default: []
  end
end
