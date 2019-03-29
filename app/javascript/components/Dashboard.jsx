import React from "react"
import ContactList from "./ContactList"
import MessageCenter from "./MessageCenter"

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.renderSideBar = this.renderSidebar.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.newContact = this.newContact.bind(this)
		this.deleteContact = this.deleteContact.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.addRecipient = this.addRecipient.bind(this)
		this.state = {
			userContacts: this.props.userContacts,
			first_name: "",
			last_name: "",
			phone_number: "",
			message: "",
			contact: "",
			contacts: []
			
		}
	}

	componentDidMount() {
		let csrfToken = document.getElementsByName('csrf-token')[0].content
		this.setState({csrfToken: csrfToken})
	}

	handleInputChange(e) {
		const target = e.target
		const value = target.value
		const name = target.name

		this.setState({
			[name]: value
		})

	}

	newContact(e) {
		e.preventDefault()
		if (this.state.first_name === "" || this.state.last_name === "" || this.state.phone_number === "") {
			alert('enter contact!');
		} else {
			fetch("/contacts", {
				method: "POST",
				body: JSON.stringify({contact: {first_name: this.state.first_name, last_name: this.state.last_name, phone_number: this.state.phone_number}}),
				headers: {
					"X-CSRF-Token": this.state.csrfToken,
					"Content-Type": "application/json"
				}
			})
			.then ( (res) => { return res.json() } )
			.then ( (data) => {
			
				this.setState({userContacts: data, first_name: "", last_name: "", phone_number: ""}) 
			})
		}
		
	}

	deleteContact(e) {
		let contact = e.target.value
		
		fetch("contacts/"+ contact, {
			method: "DELETE",
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then ( (res)=> { return res.json() } )
		.then ( (data) => { this.setState({userContacts: data})})
	}

	

	renderSidebar() {
		
			return (
				<div className="col-md-3 col-sm-3 bg-light">
					<h3>User Information</h3>
					<p>Contacts</p>
					<p>Messages</p>
					<p>Settings</p>
				</div>
			)
		
	}


	// renderView() {
	// 	let Component = this.steps()[this.state.view]

	// 	return (
	// 		<Component
	// 			{...this.props}/>
	// 	)
	// }

	sendMessage(e) {
		e.preventDefault()
		fetch("messages/", {
			method: "POST",
			body: JSON.stringify({message: {body: this.state.message }, contact: this.state.contact }),
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then( (res) => { return res.json() } )
		.then( (data) => console.log(data) )
	}

	addRecipient(e) {
		
		e.preventDefault()
		this.setState({contacts: this.state.contacts.push(this.state.contact), contact: ""})
	}


	render() {
		
		return (
			<div className="container-fluid">
				<div className="row dashboard">
					{this.renderSidebar()}
					<div className="col-md-9 col-sm-9 ml-auto mt-5 pr-2">
						<h3>Welcome {this.props.currentUser.email}</h3>
						<p>What would you like to do today?</p>
						<p>You have sent X messages in the last week.</p>
						
						<button className="btn btn-primary">View Options</button>
						
						<ContactList {...this.state} 
							currentUser={this.props.currentUser} 
							handleInputChange={this.handleInputChange} 
							newContact={this.newContact}
							deleteContact={this.deleteContact}/>
							
						<MessageCenter {...this.state} 
							currentUser={this.props.currentUser} 
							handleInputChange={this.handleInputChange} 
							addRecipient={this.addRecipient}/>
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard