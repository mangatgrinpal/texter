import React from "react"

class ContactList extends React.Component {
	constructor(props) {
		super(props)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.newContact = this.newContact.bind(this)
		this.deleteContact = this.deleteContact.bind(this)
		this.state = {
			userContacts: this.props.userContacts,
			first_name: "",
			last_name: "",
			phone_number: ""
		}
	}

	handleInputChange(e) {
		const target = e.target
		const value = target.value
		const name = target.name

		this.setState({
			[name]: value
		})

	}


	componentDidMount() {
		let csrfToken = document.getElementsByName('csrf-token')[0].content
		this.setState({csrfToken: csrfToken})
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
					<div className="row" key={contact.id}>
						<div className="col">
							{contact.first_name} {contact.last_name}
						</div>
						<div className="col">
							{contact.phone_number}
						</div>
						<div className="col">
							<button className="btn btn-sm btn-primary">send a message</button>
							<button value={contact.id} onClick={this.deleteContact} className="btn btn-sm btn-danger">delete contact</button>
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

	deleteContact(e) {
		let contact = e.target
		
		fetch("contacts/"+ contact.value, {
			method: "DELETE",
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then ( (res)=> { return res.json() } )
		.then ( (data) => { this.setState({userContacts: data})})
	}


	newContact(e) {
		e.preventDefault()

		fetch("/contacts", {
			method: "POST",
			body: JSON.stringify({contact: {first_name: this.state.first_name, last_name: this.state.last_name, phone_number: this.state.phone_number}}),
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then ( (res) => { return res.json() } )
		.then ( (data) => { this.setState({userContacts: data}) } )
		
	}


	render () {
		console.log(this.state.userContacts)
		return (
			<div className="col-12">
				<br/>
				<div className="row">
					<div className="col">
						<h3>Add a New Contact</h3>
					</div>
				</div>
				<form>
					<div className="form-row">
						<div className="col">
							First Name
							<input type="text" onChange={this.handleInputChange} className="form-control" name="first_name" placeholder="First Name"/>
						</div>
						<div className="col">
							Last Name
							<input type="text" onChange={this.handleInputChange} className="form-control" name="last_name" placeholder="Last Name"/>
						</div>
						<div className="col">
							Phone Number
							<input type="tel" onChange={this.handleInputChange} className="form-control"	name="phone_number" placeholder="(xxx)xxx-xxxx"/>
						</div>
						<div className="col">
							<button onClick={this.newContact} className="btn btn-primary">Add</button>
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