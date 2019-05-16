class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :nickname
      t.integer :user_id

      t.timestamps
    end
    add_index :groups, :nickname
    add_index :groups, :user_id
  end
end
