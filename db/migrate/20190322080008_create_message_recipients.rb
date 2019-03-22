class CreateMessageRecipients < ActiveRecord::Migration[5.2]
  def change
    create_table :message_recipients do |t|
      t.integer :message_id
      t.integer :contact_id

      t.timestamps
    end
    add_index :message_recipients, :message_id
    add_index :message_recipients, :contact_id
  end
end
