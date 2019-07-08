import React from "react";
import { CSSTransitionGroup } from "react-transition-group";

class ContactList extends React.Component {
	constructor(props) {
		super(props)
		
	}

	componentDidMount() {
		
		
	}

	


	contactList() {
		let contacts = this.props.userContacts

		if (contacts.length == 0) {
			return (
				<div>
					<br/>
					<p>You don't have any contacts yet. Add some now.</p>
				</div>
			)
			
		} else {
			
			let contactNames = contacts.map((contact)=> {
				return (
						<li key={contact.id} className="list-group-item" >
							<div className="row">
								<div className="col-md-3 col-sm-3">
									{contact.first_name} {contact.last_name}
								</div>
								<div className="col-md-3 col-sm-3">
									+1{contact.phone_number}
								</div>
								<div className="col-md-6 col-sm-6">
									<a data-id={contact.id} onClick={this.props.addRecipientFromContactsPage} className="badge badge-primary">send a message</a>
									&nbsp;
									<a data-id={contact.id} onClick={this.props.deleteContact} className="badge badge-danger">delete contact</a>
								</div>
							</div>
						</li>
				)
			})

			return (
				<React.Fragment>
					<ul className="list-group contact-list-headers">
						<li className="list-group-item">
							<div className="row">
								<div className="col-md-3 col-sm-3">
									<strong>Name</strong>

								</div>
								<div className="col-md-3 col-sm-3">
									<strong>Phone number</strong>
									
								</div>
								
									
							</div>
						</li>
					</ul>
					<ul className="list-group contact-list">
						
							{contactNames}
					</ul>
				</React.Fragment>
				
					
			)

		}
	}

	


	


	render () {
		
		return (
			<div className="container mh-100">
				<div className="row">
					<div className="col pt-3">
						<h3>Add a New Contact</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-md-3 col-sm-3">
						First Name
					</div>
					<div className="col-md-3 col-sm-3">
						Last Name
					</div>
					<div className="col-md-3 col-sm-3">
						Phone Number
					</div>
				</div>
				<form autoComplete="off">
					<div className="form-row">
						<div className="col">
							<input type="text" value={this.props.first_name} onChange={this.props.handleInputChange} className="form-control" name="first_name" placeholder="First Name"/>
						</div>
						<div className="col">
							<input type="text" value={this.props.last_name} onChange={this.props.handleInputChange} className="form-control" name="last_name" placeholder="Last Name"/>
						</div>
						<div className="col">
							<input type="tel" value={this.props.phone_number} onChange={this.props.handleInputChange} className="form-control"	name="phone_number" placeholder="(xxx)xxx-xxxx"/>
						</div>
						<div className="col">
							<button onClick={this.props.newContact} className="btn btn-primary">Add</button>
						</div>
					</div>
				</form>

				<div className="row mt-5">
					<div className="col mt-5">
						
						{this.contactList()}
					</div>
				</div>
			</div>
		)
	}
}

export default ContactList