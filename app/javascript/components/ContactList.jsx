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
						<tr key={contact.id}>
							<td>
								{contact.first_name} {contact.last_name}
							</td>
							<td>
								{contact.phone_number}
							</td>
							<td>
								<button className="badge badge-primary">send a message</button>
								&nbsp;
								<button value={contact.id} onClick={this.props.deleteContact} className="badge badge-danger">delete contact</button>
							</td>
						</tr>
				)
			})

			return (
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Phone</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						
						{contactNames}
						
					</tbody>
				</table>
					
			)

		}
	}

	


	


	render () {
		
		return (
			<div className="col-12">
				<div className="row">
					<div className="col">
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