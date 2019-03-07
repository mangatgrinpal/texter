import React from "react"

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	contactList() {
		let contacts = this.props.userContacts
		if (contacts.length == 0) {
			return (
				<div>
					<p>Sorry bro, add new contacts now!</p>
					<button>Add a new contact</button>
				</div>
			)
			
		} else {

			let contactNames = this.props.userContacts.map((contact)=> {
				return (
					<div key={contact.id}>
						{contact.first_name} {contact.last_name} {contact.phone_number} <button>send a message</button>
					</div>
				)
			})

			return (
				<div>
					<h3>Contact List</h3>
					{contactNames}
				</div>
			)

		}
	}

	renderView() {
		let Component = this.steps()[this.state.view]

		return (
			<Component
				{...this.props}/>
		)
	}


	render() {
		console.log(this.props)
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-4 bg-light">
						<h3>User Information</h3>
						{this.props.currentUser.email}
					</div>
					<div className="col-8">
						<ContactList/>
						{this.contactList()}
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard