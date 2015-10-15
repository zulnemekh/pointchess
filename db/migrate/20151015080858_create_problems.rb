class CreateProblems < ActiveRecord::Migration
  def change
    create_table :problems do |t|
      t.string :title
      t.text :pgn_data
      t.string :fen
      t.string :insert_admin
      t.string :move

      t.timestamps
    end
  end
end
