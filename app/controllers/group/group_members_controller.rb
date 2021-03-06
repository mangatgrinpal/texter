class Group::GroupMembersController < ApplicationController
	before_action :find_user

	def index
		@group_members = Group.find(params[:group_id]).group_members

		render json: {groupMembers: serialized_group_members, userContacts: serialized_contacts}

	end


	def create
		@group_members = Group.find(params[:group_id]).group_members
		@group_member = GroupMember.new(group_id:params[:group_id],contact_id:params[:contact_id])
		
		if @group_member.save
			render json: {userGroupMembers: serialized_group_members, userGroups: serialized_groups, userContacts: serialized_contacts}, status: 200
		else
			render json: {}, status: 400
		end
	end

	def destroy
		@group_members = Group.find(params[:group_id]).group_members
		@group_member = GroupMember.find(params[:id])

		@group_member.destroy
		render json: {userGroupMembers: serialized_group_members, userGroups: serialized_groups}, status: 200
	end


	private

	def find_user
    @user = current_user
  end

  def serialized_contacts
    ActiveModel::Serializer::CollectionSerializer.new(@user.contacts.order('last_name ASC'), each_serializer: ContactSerializer)
  end

  def serialized_group_members
  	ActiveModel::Serializer::CollectionSerializer.new(@group_members, each_serializer: GroupMemberSerializer)
  end

  def serialized_groups
  	ActiveModel::Serializer::CollectionSerializer.new(@user.groups, each_serializer: GroupSerializer)
  end

end