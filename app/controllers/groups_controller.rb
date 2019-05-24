class GroupsController < ApplicationController
  
	before_action :authenticate_user!
	before_action :find_user

  def create
  	@group = @user.groups.build(group_params)

		if @group.save
      
			render json: ActiveModel::Serializer::CollectionSerializer.new(@user.groups, each_serializer: GroupSerializer), status: 200
		else
			render json: {}, status: 400
		end
  end

  def destroy
  	@group = Group.find(params[:id])
		
		@group.destroy
    
		render json: ActiveModel::Serializer::CollectionSerializer.new(@user.groups, each_serializer: GroupSerializer), status: 200
  end

  private

  def user_group_members
    @user.groups.map do |group|
      group.group_members
    end
  end

  def find_user
  	@user = current_user
  end

  def group_params
  	params.require(:group).permit(:nickname)
  end
end
