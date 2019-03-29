import React from "react"

class ContactList extends React.Component {
	constructor(props) {
		super(props)
		
	}

	componentDidMount() {
		let csrfToken = document.getElementsByName('csrf-token')[0].content
		this.setState({csrfToken: csrfToken})
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
					<div className="row" key={contact.id}>
						<div className="col">
							{contact.first_name} {contact.last_name}
						</div>
						<div className="col">
							{contact.phone_number}
						</div>
						<div className="col">
							<button className="badge badge-primary">send a message</button>
							&nbsp;
							<button value={contact.id} onClick={this.props.deleteContact} className="badge badge-danger">delete contact</button>
						</div>
					</div>
				)
			})

			return (
				<div>
					<h3>Contacts</h3>
					<div className="row">
						<div className="col">
							<h6>Name</h6>
						</div>
						<div className="col">
							Phone
						</div>
						<div className="col">

						</div>
					</div>
					{contactNames}
				</div>
			)

		}
	}

	


	


	render () {
		console.log(this.props)
		return (
			<div className="col-12">
				<br/>
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
				<div className="row">
					<div className="col">
					{this.contactList()}
					</div>
				</div>
			</div>
		)
	}
}

export default ContactList