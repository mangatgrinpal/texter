class CreateGroupMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :group_members do |t|
      t.integer :group_id
      t.integer :contact_id

      t.timestamps
    end
    add_index :group_members, :group_id
    add_index :group_members, :contact_id
  end
end
