class Group::GroupMembersController < ApplicationController

	def index

		render json: @group_members = Group.find(params[:group_id]).group_members

	end


	def create
		@group_members = Group.find(params[:group_id]).group_members
		@group_member = GroupMember.new(group_id:params[:group_id],contact_id:params[:contact_id])
		if @group_member.save
			render json: @group_members, status: 200
		else
			render json: {}, status: 400
		end
	end

	def destroy
		@group_members = Group.find(params[:group_id]).group_members
		@group_member = GroupMember.find(params[:id])

		@group_member.destroy
		render json: @group_members, status: 200
	end


	private

	def user_group_members
    @user.groups.map do |group|
      group.group_members
    end
  end

end
