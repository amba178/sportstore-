class CreateOrderLines < ActiveRecord::Migration
  def change
    create_table :order_lines do |t|
      t.integer :count
      t.references :product, index: true, foreign_key: true, dependent: :delete
      t.references :order, index: true, foreign_key: true, dependent: :delete

      t.timestamps null: false
    end
  end
end
