class ProductsController < ApplicationController
  respond_to :html, :xml, :json 
  skip_before_action :verify_authenticity_token, if: :json_request? 
  # before_action :admin 

  def index
  	@products = Product.all 
    respond_with(@products)
  end

  def create
  	  product = Product.new(params_product)
      product.save!
	  respond_with product
	  head :ok
  end

  def update
  	product = Product.find(params[:id])
  	product.update_attributes(params_product)
  	head :ok
  end

  def destroy
  	product = Product.find(params[:id])
  	product.delete
  	head :ok
  end

  private 

  	def params_product
  		params.require(:product).permit(:name, :price, :description, :category)
  	end

  	def json_request?
  	  request.format.json?
  	end

    def admin
      if current_user.roles.include?("admin")
       redirect_to '/main' 
      end
    end

end
