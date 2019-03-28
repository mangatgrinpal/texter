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


	contactList() {
		let contacts = this.state.userContacts
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
							<button value={contact.id} onClick={this.deleteContact} className="badge badge-danger">delete contact</button>
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


	render () {
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
							<input type="text" value={this.state.first_name} onChange={this.handleInputChange} className="form-control" name="first_name" placeholder="First Name"/>
						</div>
						<div className="col">
							<input type="text" value={this.state.last_name} onChange={this.handleInputChange} className="form-control" name="last_name" placeholder="Last Name"/>
						</div>
						<div className="col">
							<input type="tel" value={this.state.phone_number} onChange={this.handleInputChange} className="form-control"	name="phone_number" placeholder="(xxx)xxx-xxxx"/>
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