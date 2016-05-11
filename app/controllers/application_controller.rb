class ApplicationController < ActionController::Base
	
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token, if: :json_request?
  before_action :authenticate_user!
  before_filter :discard_flash, :unless => :devise_controller?

private
	def discard_flash
	  flash.discard              # discard the entire flash at the end of the current action
	  flash.discard(:warning)    # discard only the "warning" entry at the end of the current action
	end

	def json_request?
	  request.format.json?
	 end

end
