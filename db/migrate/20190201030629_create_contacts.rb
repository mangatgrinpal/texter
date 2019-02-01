class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone_number
      t.integer :user_id

      t.timestamps
    end
    add_index :contacts, :user_id
  end
end
