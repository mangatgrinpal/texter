class GroupsController < ApplicationController
  
	before_action :authenticate_user!
	before_action :find_user

  def create
  	@group = @user.groups.build(group_params)

		if @group.save
      
			render json: return_parsed_json, status: 200
		else
			render json: {}, status: 400
		end
  end

  def destroy
  	@group = Group.find(params[:id])
		
		@group.destroy
    
		render json: return_parsed_json, status: 200
  end

  private

  def return_parsed_json
    JSON.parse GroupSerializer.new(@user.groups).serialized_json
  end

  def find_user
  	@user = current_user
  end

  def group_params
  	params.require(:group).permit(:nickname)
  end
end
