require 'google/apis/people_v1'
require 'google/api_client/client_secrets.rb'


class ApplicationController < ActionController::Base
	before_action :configure_permitted_parameters, if: :devise_controller?
	#before_action :set_headers

	People = Google::Apis::PeopleV1

	def contacts
		secrets = Google::APIClient::ClientSecrets.new(
			{
				"web": {
					"access_token": current_user.token,
					"refresh_token": current_user.refresh_token,
					"client_id": ENV["google_client_id"],
					"client_secret": ENV["google_client_secret"]
				}
			}
		)
		service = People::PeopleServiceService.new
		service.authorization = secrets.to_authorization

		response = service.list_person_connections(
			'people/me',
			person_fields: ['names', 'phoneNumbers']
		)
		render json: response
	end

	protected

  def set_headers
    response.set_header('Access-Control-Allow-Origin', '*')
    response.set_header('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS')
    response.set_header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
  end

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
