import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class GroupModal extends React.Component {
	constructor(props) {
		super(props)
		this.renderGroupMembers = this.renderGroupMembers.bind(this)
		this.state = {
			contactsLength: 0
		}
		
	}

	renderContacts() {
		let contacts = this.props.userContacts

		if (contacts.length == 0) {
			return (
				<div className="row">
					<div className="col-md-12 col-sm-12">
						You don't have any contacts to add.
					</div>
				</div>
			)
		} else {
			
			let contactNames = contacts.map((contact)=> {

				return (
					<li key={contact.id} className="list-group-item">
						<div className="row justify-content-around">
							<div className="col-md-10 col-sm-10">
								{contact.first_name} {contact.last_name} 
							</div>
							<div className="col-md-2 col-sm-2 add-icon">
								
								<FontAwesomeIcon className="font-awesome-icon" data-id={contact.id} onClick={this.props.addGroupMembers} icon="plus" size="1x"/>
								
							</div>
						</div>
					</li>
				)
			})

			return (
				<ul className="list-group list-group-flush">
					{contactNames}
				</ul>
    		
			)
		}
	}

	renderGroupMembers() {
		

		if (this.props.userGroupMembers.length != 0) {

			

			let groupMemberNames = this.props.userGroupMembers.map((groupMember)=> {


				return (
					<li key={groupMember.id} className="list-group-item">
						<div className="row justify-content-around">
							<div className="col-md-10 col-sm-10">
								{groupMember.contact.first_name} {groupMember.contact.last_name} 
							</div>
							<div className="col-md-2 col-sm-2 remove-icon">
								
								<FontAwesomeIcon className="font-awesome-icon" data-id={groupMember.id} onClick={this.props.removeGroupMembers} icon="times" size="1x"/>
									
							</div>
						</div>
					</li>
				)
			})

			return (
	  		<ul className="list-group list-group-flush">
	  			{groupMemberNames}
	  		</ul>
			)	

		} else {

			return (
				<div className="pt-2">
					You don't have any members in this group. Add some now.
				</div>
			)
		}

	}

	renderFilteredContacts() {

		let groupMemberIds = this.props.userGroupMembers.map(groupMember => {
			return groupMember.id
		})
		let contacts = this.props.userContacts


		// we need to filter the contacts for ones that are in ANY group
		let filtered = contacts.filter(contact => {
			// so if the contact has group_members which mean group memberships let's return true
			return contact.group_members.length > 0 ? true : false

			
		});
		// filtered is an array full of contacts that appear in ANY group

		// now let's check if that filtered contact's 
		let filteredContacts = contacts.filter( (contact) => {
			// this function will check if a single true exists in any array
			let truthChecker = function(element) {
				return element == true
			}
			// validatedMemberships will be an array of true and falses
			let validatedMemberships = contact.group_members.map((membership=> {
				return groupMemberIds.includes(membership.id)
			}))

			// this normally returns true if any of the elements are true, but bang operator makes it return false so this contact is removed from filteredContacts
			return !validatedMemberships.some(truthChecker)
			
			// now contacts will only keep the ones that pass the truth checker
			return true
		})

		// this function below sets state to the current length of filtered contacts so that it may be used to show user how many contacts remaining


		let contactNames = filteredContacts.map((contact)=> {

				return (
					<li key={contact.id} className="list-group-item">
						<div className="row justify-content-around">
							<div className="col-md-10 col-sm-10">
								{contact.first_name} {contact.last_name} 
							</div>
							<div className="col-md-2 col-sm-2 add-icon">
								
								<FontAwesomeIcon className="font-awesome-icon" data-id={contact.id} onClick={this.props.addGroupMembers} icon="plus" size="1x"/>
								
							</div>
						</div>
					</li>
				)
			})

			
			return (
				<ul className="list-group list-group-flush">
					{contactNames}
				</ul>
    		
			)	
		
		
	}



	render() {
		let loadingOrContent

		if (this.props.spinner) {

			loadingOrContent = 

				<div className="d-flex justify-content-center">
          <div className="spinner-border my-5 text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
			

		} else {

			loadingOrContent =
			
				<div id="groupModalBody" className="modal-body">
		      <div className="row">
		      	<div className="col-md-6 col-sm-6">
		    			<strong>In group ({this.props.userGroupMembers.length})</strong>
		    		</div>
		    		<div className="col-md-6 col-sm-6">
		    			<strong>Remaining contacts</strong>
		    		</div>
		      </div>
		      <div className="row group-contact-list">
			    	<div className="col-md-6 col-sm-6">
			    		{this.renderGroupMembers()}
			    		
			    	</div>
			    	<div className="col-md-6 col-sm-6">
			    		{this.props.userGroupMembers.length > 0 ? this.renderFilteredContacts() : this.renderContacts()}
			    	</div>
			    </div>
		        
	      </div>

			
		}
		


		return (
			<div className="modal" id="groupModalCenter" tabIndex="-1" role="dialog" aria-labelledby="groupModalCenterTitle" aria-hidden="true">
			  <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="groupModalCenterTitle">Manage Group</h5>
			      </div>
			      {loadingOrContent}
			      <div className="modal-footer">
			        
			        <button type="button" onClick={this.props.clearSelectedGroup} className="btn btn-sm btn-primary">Close</button>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}

export default GroupModal