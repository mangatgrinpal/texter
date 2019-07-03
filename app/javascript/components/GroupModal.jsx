import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class GroupModal extends React.Component {
	constructor(props) {
		super(props)
		this.renderGroupMembers = this.renderGroupMembers.bind(this)
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
		
		
		if (this.props.spinner) {

			return (
				<div className="d-flex justify-content-center">
          <div className="spinner-border mt-5 text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
			)

		}

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
	  		<ul className="list-group list-group-flush">{groupMemberNames}</ul>
			)	

		} else {

			return (
				<div className="pt-2">
					You don't have any members in this group. Add some now.
				</div>
			)
		}

	}


	render() {

		return (
			<div className="modal" id="groupModalCenter" tabIndex="-1" role="dialog" aria-labelledby="groupModalCenterTitle" aria-hidden="true">
			  <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="groupModalCenterTitle">Manage Group</h5>
			      </div>
			      <div id="groupModalBody" className="modal-body">
				      <div className="row">
				      	<div className="col-md-6 col-sm-6">
				    			<h5>In Group</h5>
				    		</div>
				    		<div className="col-md-6 col-sm-6">
				    			<h5>Contacts ({this.props.userContacts.length})</h5>
				    		</div>
				      </div>
				      <div className="row group-contact-list">
					    	<div className="col-md-6 col-sm-6">
					    		{this.renderGroupMembers()}
					    		
					    	</div>
					    	<div className="col-md-6 col-sm-6">
					    		{this.renderContacts()}
					    	</div>
					    </div>
				        
			      </div>
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