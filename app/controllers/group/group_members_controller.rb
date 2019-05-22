class Group::GroupMembersController < ApplicationController




	def create
		@group_member = GroupMember.new(group_id:params[:group_id],contact_id:params[:contact_id])
		if @group_member.save
			render json: {}, status: 200
		else
			render json: {}, status: 400
		end
	end

	def destroy
		@group_member = GroupMember.find(params[:id])

		@group_member.destroy
		render json: {}, status: 200
	end


end
