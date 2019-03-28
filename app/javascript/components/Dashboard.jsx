import React from "react"
import ContactList from "./ContactList"
import MessageCenter from "./MessageCenter"

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.renderSideBar = this.renderSidebar.bind(this)
	
		this.state = {
			userContacts: this.props.userContacts,
			first_name: "",
			last_name: "",
			phone_number: ""
			
		}
	}

	

	

	renderSidebar() {
		
			return (
				<div className="col-3 bg-light">
					<h3>User Information</h3>
					<p>Contacts</p>
					<p>Messages</p>
					<p>Settings</p>
				</div>
			)
		
	}

	toggleSidebar() {
		this.setState({isHidden: !this.state.isHidden})
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
						
						<ContactList currentUser={this.props.currentUser} userContacts={this.props.userContacts} />
						<MessageCenter currentUser={this.props.currentUser} userContacts={this.props.userContacts} />
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard