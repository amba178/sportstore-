class OrdersController < ApplicationController
	respond_to :html, :xml, :json 

	def index
		@orders = Order.all 
        respond_with(@orders.to_json(:include => [:products, :order_lines]))
	end

	def show
		respond_with @order
	end

	def update
	end

	def create
		ids = params[:products].map{|product| product[:id]}
		counts = params[:products].map{|product| product[:count]}

		@order = Order.new(order_params)
		if @order.save
			@order.products << Product.find(ids)
			@order.save!
			@order.order_lines.each do |order_line|
				order_line.update(count: counts.pop)
			end

		end
		respond_with @order, :location => '/complete'
	end

	private 

	def order_params
		params.require(:order).permit(:name, :street, :city, :state, :country, :zip, :giftwrap) 
	end

end
