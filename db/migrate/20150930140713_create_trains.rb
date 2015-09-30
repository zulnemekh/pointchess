class CreateTrains < ActiveRecord::Migration
  def change
    create_table :trains do |t|
      t.string :title
      t.text :text_data
      t.string :pgn_type
      t.string :insert_admin

      t.timestamps
    end
  end
end
