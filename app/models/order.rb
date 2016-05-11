class Order < ActiveRecord::Base
	has_many :products, :through => :order_lines
	has_many :order_lines
end
