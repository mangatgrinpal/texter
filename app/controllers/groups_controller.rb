class GroupsController < ApplicationController
	before_action :authenticate_user!
	before_action :find_user

  def create
  	@group = @user.groups.build(group_params)

		if @group.save
			render json: @user.groups, status: 200
		else
			render json: {}, status: 400
		end
  end

  def destroy
  	@group = Group.find(params[:id])
		
		@group.destroy
		render json: @user.groups, status: 200
  end

  private

  def find_user
  	@user = current_user
  end

  def group_params
  	params.require(:group).permit(:nickname)
  end
end
