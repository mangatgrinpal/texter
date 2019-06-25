class ApplicationController < ActionController::Base
	before_action :configure_permitted_parameters, if: :devise_controller?

	protected

	# configured devise to add more columns to user model
	def configure_permitted_parameters
		devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
	end


	# configured devise so that when user signs up or logs in, they are directed to their dashboard
	def after_sign_in_path_for(resource)
		stored_location_for(resource) || dashboard_path
	end

	def after_sign_up_path_for(resource)
		stored_location_for(resource) || dashboard_path
	end
end
