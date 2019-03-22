import React from "react"
import ContactList from "./ContactList"

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.renderSideBar = this.renderSidebar.bind(this)
		this.toggleSidebar = this.toggleSidebar.bind(this)
		this.state = {
			isHidden: true
			
		}
	}

	

	

	renderSidebar() {
		if (this.state.isHidden) {
			return <div/>
		} else {
			return (
				<div className="col-3 bg-light">
					<h3>User Information</h3>
					<p>Contacts</p>
					<p>Messages</p>
					<p>Settings</p>
				</div>
			)
		}
	}

	toggleSidebar() {
		this.setState({isHidden: !this.state.isHidden})
	}

	contactList() {
		let contacts = this.state.userContacts
		if (contacts.length == 0) {
			return (
				<div>
					<p>Sorry bro, add new contacts now!</p>
					<button>Add a new contact</button>
				</div>
			)
			
		} else {

			let contactNames = this.state.userContacts.map((contact)=> {
				return (
					<div key={contact.id}>
						{contact.first_name} {contact.last_name} {contact.phone_number} <button className="btn btn-primary">send a message</button>
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
		
		return (
			<div className="container-fluid">
				<div className="row dashboard">
					{this.renderSidebar()}
					<div className="col-9 ml-auto mt-5 pr-2">
						<h3>Welcome {this.props.currentUser.email}</h3>
						<p>What would you like to do today?</p>
						<p>You have sent X messages in the last week.</p>
						
						<button className="btn btn-primary" onClick={this.toggleSidebar}>View Options</button>
						
						<ContactList currentUser={this.props.currentUser} userContacts={this.props.userContacts}/>
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard