import React from "react"
import DashHome from "./DashHome"
import ContactCenter from "./ContactCenter"
import MessageCenter from "./MessageCenter"
import AlertModal from "./AlertModal"
import GroupModal from "./GroupModal"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"



library.add(fas, far)


class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.renderSideBar = this.renderSidebar.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.newContact = this.newContact.bind(this)
		this.deleteContact = this.deleteContact.bind(this)
		this.newGroup = this.newGroup.bind(this)
		this.deleteGroup = this.deleteGroup.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.addRecipient = this.addRecipient.bind(this)
		this.deleteRecipient = this.deleteRecipient.bind(this)
		this.setPage = this.setPage.bind(this)
		this.setSelectedGroup = this.setSelectedGroup.bind(this)
		this.clearSelectedGroup = this.clearSelectedGroup.bind(this)
		this.addGroupMembers = this.addGroupMembers.bind(this)
		this.removeGroupMembers = this.removeGroupMembers.bind(this)
		this.renderView = this.renderView.bind(this)
		this.state = {
			page: "home",
			userContacts: this.props.userContacts,
			userGroups: this.props.userGroups,
			userGroupMembers: [],
			first_name: "",
			last_name: "",
			phone_number: "",
			message: "",
			recipients: [],
			errorMessage: "",
			nickname: "",
			selectedGroup: "",
			spinner: false
			
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

	setPage(e) {
		e.preventDefault()
		let page = e.target.id
		
		this.setState({page: page})
	}

	renderSidebar() {
		
			return (
				<div className="col-md-3 col-sm-3 bg-light">
					
					<ul className="nav flex-column">
						<li className="nav-item">
							<span onClick={this.setPage} id="home" className="nav-link">
								Hello, {this.props.currentUser.first_name}
							</span>
						</li>
						<li className="nav-item">
							<a onClick={this.setPage} id="contacts" className="nav-link">Contacts</a>
						</li>
						<li className="nav-item">
							<a onClick={this.setPage} id="messages" className="nav-link">Messages</a>
						</li>
						
					</ul>
				</div>
			)
		
	}

	pages() {
		return {
			home: DashHome,
			messages: MessageCenter,
			contacts: ContactCenter
		}
	}


	renderView() {
		let Component = this.pages()[this.state.page]

		return (
			
			<Component 
				{...this.props}
				{...this.state} 
				handleInputChange={this.handleInputChange} 
				newContact={this.newContact}
				deleteContact={this.deleteContact}
				addRecipient={this.addRecipient}
				deleteRecipient={this.deleteRecipient}
				newGroup={this.newGroup}
				deleteGroup={this.deleteGroup}
				setSelectedGroup={this.setSelectedGroup}
				sendMessage={this.sendMessage}/>
		
		)
	}

	sendMessage(e) {
		e.preventDefault()
		fetch("messages/", {
			method: "POST",
			body: JSON.stringify({message: {body: this.state.message }, recipients: this.state.recipients }),
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then( (res) => { return res.json() } )
		.then( (data) => console.log(data) )
	}

	//this function adds recipients to the recipient array in state, to whom the message will be sent
	//this function will be used across different pages
	addRecipient(e, recipient) {
		e.preventDefault()

		
		if (this.state.page == "contacts") {
			let selected = e.target.value
			let filtered = this.state.userContacts.filter((recipient)=> {
				return recipient.id == selected
			})
			
			this.setState({recipients: filtered, page: "messages"	})


		} 
		if (this.state.recipients.includes(recipient)) {
			alert('already added foo!');
		} else {

			let queryRecipientResult = this.state.userContacts.filter((contact)=> {
			let fullName = contact.first_name + " " + contact.last_name
			if (fullName === recipient) {
				return contact
			}
			})		

			if (queryRecipientResult === undefined || queryRecipientResult.length == 0) {

				this.setState({errorMessage: "This contact doesn't exist!"})
				$('#alertModalCenter').modal('toggle')
				

			} else {

				let recipients = Object.assign([], this.state.recipients);

				recipients.push(queryRecipientResult[0])

				this.setState({ recipients: recipients })
				
			}
		}
		
		
		
	}

	// function to delete recipient
	deleteRecipient(e) {
		
		let selected = e.currentTarget.dataset.id
		let filtered = this.state.recipients.filter((recipient)=> {
			return recipient.id != selected
		})
		
		this.setState({recipients: filtered})

	}


	//this function creates new groups
	newGroup(e) {
		e.preventDefault()
		if (this.state.nickname === "") {
			alert('enter group name!');
		} else {
			fetch("/groups", {
				method: "POST",
				body: JSON.stringify({group: {nickname: this.state.nickname}}),
				headers: {
					"X-CSRF-Token": this.state.csrfToken,
					"Content-Type": "application/json"
				}
			})
			.then ( res => { return res.json() } )
			.then ( data => {
				
				this.setState({userGroups: data, nickname: ""}) 
			})
		}
		
	}
	// this function deletes groups
	deleteGroup(e) {
		let group = e.target.value
		
		fetch("groups/" + group, {
			method: "DELETE",
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then ( res => { return res.json() } )

		.then ( data => { this.setState({userGroups: data}) })
	}

	// this will set which group is selected to be updated
	setSelectedGroup(e) {
		this.setState({spinner: true})
		$('#groupModalCenter').modal('show')
		let group = e.target.value
		fetch("/groups/" + group + "/group_members", {
			method: "GET",
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then ( res => { return res.json() })
		.then ( data => { this.setState({userGroupMembers: data, selectedGroup: group},()=>this.setState({spinner: false})) })
		

	}

	clearSelectedGroup(e) {
		$('#groupModalCenter').modal('hide')
		this.setState({selectedGroup: "", spinner: true})
	}

	// this function will allow user to add contacts to groups
	addGroupMembers(e) {
		let contact = e.currentTarget.dataset.id

		fetch("groups/" + this.state.selectedGroup + "/group_members", {
			method: "POST",
			body: JSON.stringify({contact_id: contact}),
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then ( res => { return res.json() })
		.then ( data => { this.setState({userGroupMembers: data.userGroupMembers, userGroups: data.userGroups}) })
	}

	removeGroupMembers(e) {
		let groupMember = e.currentTarget.dataset.id

		fetch("groups/" + this.state.selectedGroup + "/group_members/" + groupMember, {
			method: "DELETE",
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then ( res => { return res.json() })
		.then ( data => { this.setState({userGroupMembers: data.userGroupMembers, userGroups: data.userGroups}) })
	}

	


	render() {
		
		return (
			<div className="container-fluid">
				<div className="row dashboard">
					{this.renderSidebar()}
					<div className="col-md-9 col-sm-9 ml-auto mt-5 pr-2">
						<GroupModal 
							{...this.state}
							clearSelectedGroup={this.clearSelectedGroup}
							addGroupMembers={this.addGroupMembers}
							removeGroupMembers={this.removeGroupMembers}/>
						<AlertModal 

							errorMessage={this.state.errorMessage}/>
						
						{this.renderView()}
						
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard