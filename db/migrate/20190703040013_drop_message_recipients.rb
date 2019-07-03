class DropMessageRecipients < ActiveRecord::Migration[5.2]
  def change
  	drop_table :message_recipients
  end
end
