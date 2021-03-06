import React from "react"
import DashHome from "./DashHome"
import ContactCenter from "./ContactCenter"
import MessageCenter from "./MessageCenter"
import FormModal from "./FormModal"
import GroupModal from "./GroupModal"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


library.add(fas, far)


class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this)
		this.newContact = this.newContact.bind(this)
		this.deleteContact = this.deleteContact.bind(this)
		this.addGroup = this.addGroup.bind(this)
		this.newGroup = this.newGroup.bind(this)
		this.deleteGroup = this.deleteGroup.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.addRecipient = this.addRecipient.bind(this)
		// the add recipient function below is only used on contact list page
		this.addRecipientFromContactsPage = this.addRecipientFromContactsPage.bind(this)
		this.deleteRecipient = this.deleteRecipient.bind(this)
		this.setPage = this.setPage.bind(this)
		this.setFormSelection = this.setFormSelection.bind(this)
		this.setSelectedGroup = this.setSelectedGroup.bind(this)
		this.clearSelectedGroup = this.clearSelectedGroup.bind(this)
		this.addGroupMembers = this.addGroupMembers.bind(this)
		this.removeGroupMembers = this.removeGroupMembers.bind(this)
		this.renderView = this.renderView.bind(this)
		// these functions are all for the autosuggest component
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
		this.getSuggestionValue = this.getSuggestionValue.bind(this)
		this.renderSuggestion = this.renderSuggestion.bind(this)
		this.renderSectionTitle = this.renderSectionTitle.bind(this)
		this.getSectionSuggestions = this.getSectionSuggestions.bind(this)
		this.onChange = this.onChange.bind(this)

		// end functions for autosuggest component

		this.state = {
			page: "home",
			tab: "nav-contacts-tab",
			formSelection: "",
			userContacts: this.props.userContacts,
			userGroups: this.props.userGroups,
			userGroupMembers: [],
			recentMessages: this.props.recentMessages,
			first_name: "",
			last_name: "",
			phone_number: "",
			message: "",
			recipients: [],
			errorMessage: "",
			nickname: "",
			selectedGroup: "",
			spinner: false,
			value: "",
			suggestions: [],
			contactsAndGroups: [
				{
					type: 'Groups',
					names: [
						this.props.userGroups
					]
				},
				{
					type: 'Contacts',
					names: [
						this.props.userContacts
					]
				}
			]
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
		// regex to match phone numbers
		let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/


		// validatedPhoneNumber returns null if it isn't valid phone number format
		let validatedPhoneNumber = this.state.phone_number.match(phoneRegex);

		// this regex removes everything from the string except digits to save it in my db in the right format
		let digitsOnly = this.state.phone_number.replace(/[^a-zA-Z0-9 ]/g, '')

		// if any fields are empty
		if (this.state.first_name.trim() === "" || this.state.last_name.trim() === "" || this.state.phone_number.trim() === "") {
			// alert the user of the error
			window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: 'Enter contact information!', type: 'error'})

			// if they each have non-blank values
		} else {
			// if the phone number passes the validation and doesn't return null, it will create the contact
			if (validatedPhoneNumber) {
				fetch("/contacts", {
				method: "POST",
				body: JSON.stringify({contact: {first_name: this.state.first_name, last_name: this.state.last_name, phone_number: digitsOnly}}),
				headers: {
					"X-CSRF-Token": this.state.csrfToken,
					"Content-Type": "application/json"
				}
			})
			.then ( (res) => { return res.json() } )
			.then ( (data) => {
				let contactsAndGroups = Object.assign([], this.state.contactsAndGroups)
				contactsAndGroups[1].names[0] = data

				this.setState({

					userContacts: data, 
					first_name: "", 
					last_name: "", 
					phone_number: "",
					contactsAndGroups: contactsAndGroups
				}) 
			})
			$('#formModalCenter').modal('hide')

			} else {

				window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: 'Phone number invalid!', type: 'error'})
			}
			
		}
		
	}

	deleteContact(e) {
		let contact = e.currentTarget.dataset.id
		
		fetch("contacts/"+ contact, {
			method: "DELETE",
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then ( (res)=> { return res.json() } )
		.then ( (data) => { 
			let contactsAndGroups = Object.assign([], this.state.contactsAndGroups)
			contactsAndGroups[1].names[0] = data.userContacts

			this.setState({
				userContacts: data.userContacts, 
				recentMessages: data.recentMessages,
				contactsAndGroups: contactsAndGroups
			})
		})
	}

	setPage(e) {
		e.preventDefault()
		let page = e.target.id
		
		this.setState({page: page})
	}

	setFormSelection(e) {
		e.preventDefault()
		let form = e.currentTarget.id

		this.setState({formSelection: form})
		$('#formModalCenter').modal('show')
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
				addRecipientFromContactsPage={this.addRecipientFromContactsPage}
				deleteRecipient={this.deleteRecipient}
				addGroup={this.addGroup}
				newGroup={this.newGroup}
				deleteGroup={this.deleteGroup}
				setSelectedGroup={this.setSelectedGroup}
				sendMessage={this.sendMessage}/>
		
		)
	}

	sendMessage(e) {
		e.preventDefault()
		let messageWithSenderName = "@" + this.props.currentUser.first_name + ": " + this.state.message.trim()



		if (messageWithSenderName.length < 1600) {
			if (this.state.recipients.length > 0 && this.state.message.trim()) {
				fetch("messages/", {
					method: "POST",
					body: JSON.stringify({message: {body: messageWithSenderName }, recipients: this.state.recipients }),
					headers: {
						"X-CSRF-Token": this.state.csrfToken,
						"Content-Type": "application/json"
					}
				})
				.then( (res) => { return res.json() } )
				.then( (data) => { 
					this.setState({
						page: "messages",
						recentMessages: data,
						message: "",
						recipients: []
					})
				})
				$('#formModalCenter').modal('hide')

			} else {
				window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: 'Whoops, your message is missing!', type: 'error'})
			}
		} else {

			window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: `Sorry, your message is ${messageWithSenderName.length - 1600} characters over the limit.`, type: 'error'})
		}
		
	}

	

	//this function adds recipients to the recipient array in state, to whom the message will be sent
	//this function will be used only with auto-suggest
	addRecipient(recipient) {

		
		// this makes sure there isn't already 100 recipients
		if (this.state.recipients.length < 100) {

			let recipients = Object.assign([], this.state.recipients);

			let duplicateChecker = recipients.some(person=> {
			    return person.id == recipient.id
			})

			if (duplicateChecker) {

				window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: 'Already added contact.', type: 'error'})


			
			} else {
				
				recipients.push(recipient)

				this.setState({ recipients: recipients })

			}		

		} else {
			window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: 'Max recipients reached.', type: 'error'})
		}



		

	}


	// this function will only be used to add contacts from the contact list.. for now
	addRecipientFromContactsPage(e) {

		e.preventDefault()

		

		if (this.state.recipients.length < 100) {
			let target = e.target.dataset.id

			let recipients = Object.assign([], this.state.recipients)

			let contact = this.state.userContacts.filter((contact)=> {
				if (contact.id == target) {

					return contact
				}
			})



			if (recipients.includes(contact[0])) {

				window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: 'Already added contact.', type: 'error'})
				$("#formModalCenter").modal('show')

			} else {
				
				let newRecipients = recipients.concat(contact)

				this.setState({ formSelection: "message", recipients: newRecipients })
				$("#formModalCenter").modal('show')

			}
		} else {
			window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: 'Max recipients reached.', type: 'error'})
		}
		

	}

	// this function will add entire groups to the message recipient list
	addGroup(group) {
		

		// this makes sure the total recipients doesnt exceed 100
		if (this.state.recipients.length + group.contacts.length < 100) {
			if (group.contacts.length === 0) {

				window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: 'No contacts in this group!', type: 'error'})

			} else {
				
					let recipients = Object.assign([], this.state.recipients)

					let newRecipients = recipients.concat(group.contacts)

					var result = newRecipients.reduce((unique, o) => {
						
					    if(!unique.some(obj => obj.id === o.id)) {
					      unique.push(o);
					    }
					    return unique;
					},[]);

					// this checks if duplicates were added and alerts the user if so.
					if (recipients.length != 0 && result != newRecipients) {
						window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: 'Duplicate contacts have been omitted.', type: 'alert'})
					}

					this.setState({ recipients: result})

			}
		} else {
			window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: `Too many recipients! Only ${100 - this.state.recipients.length} more allowed.`, type: 'alert'})
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

		if (this.state.nickname.trim() === "") {
			window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: 'Enter a nickname for your new group!', type: 'error'})

		} else {

			if (this.state.nickname.trim().length < 64) {

				// this function will run through the userGroups to see if the nickname exists
				let validated = this.state.userGroups.map((group)=> {
					return this.state.nickname.toLowerCase() == group.nickname.toLowerCase() ? true : false
				})

				// if it does include a true, it will return true but bang operator makes it false
				// so only if it doesn't include it, will this ever return true, thus creating record
				if (!validated.includes(true)) {
					fetch("/groups", {
						method: "POST",
						body: JSON.stringify({group: {nickname: this.state.nickname.trim()}}),
						headers: {
							"X-CSRF-Token": this.state.csrfToken,
							"Content-Type": "application/json"
						}
					})
					.then ( res => { return res.json() } )
					.then ( data => {
						let contactsAndGroups = Object.assign([], this.state.contactsAndGroups)
						contactsAndGroups[0].names[0] = data


						this.setState({userGroups: data, nickname: "", contactsAndGroups: contactsAndGroups}) 
					})
				} else {
					window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: `${this.state.nickname} is already in use!`, type: 'error'})
				}

			} else {
				window.flash_messages.addMessage({ id: Math.round(Math.random()*1000), text: `Group nickname is ${this.state.nickname.trim().length - 64} characters over the limit of 64.`, type: 'error'})
			}

			
			
		}
		
	}
	// this function deletes groups
	deleteGroup(e) {
		let group = e.currentTarget.dataset.id
		
		fetch("groups/" + group, {
			method: "DELETE",
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then ( res => { return res.json() } )

		.then ( data => {
			let contactsAndGroups = Object.assign([], this.state.contactsAndGroups)
			contactsAndGroups[0].names[0] = data

			this.setState({
				userGroups: data,
				contactsAndGroups: contactsAndGroups
			}) 
		})
	}

	// this will set which group is selected to be updated
	setSelectedGroup(e) {
		this.setState({spinner: true})

		$('#groupModalCenter').modal('show')
		let group = e.currentTarget.dataset.id
		fetch("/groups/" + group + "/group_members", {
			method: "GET",
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then ( res => { return res.json() })
		.then ( data => {
			
			this.setState({
				userContacts: data.userContacts,
				userGroupMembers: data.groupMembers, 
				selectedGroup: group
			},()=>this.setState({spinner: false})) 
		})
		

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
		.then ( data => {

			let contactsAndGroups = Object.assign([], this.state.contactsAndGroups)
			contactsAndGroups[0].names[0] = data.userGroups

			this.setState({
				userContacts: data.userContacts,
				userGroupMembers: data.userGroupMembers, 
				userGroups: data.userGroups,
				contactsAndGroups: contactsAndGroups
			})

		})
	}


	// this function will allow users to remove members from groups
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
		.then ( data => {

			let contactsAndGroups = Object.assign([], this.state.contactsAndGroups)
			contactsAndGroups[0].names[0] = data.userGroups

			this.setState({

				userGroupMembers: data.userGroupMembers,
				userGroups: data.userGroups,
				contactsAndGroups: contactsAndGroups
			})
		})
	}

	escapeRegexCharacters(str) {
	  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	// BEGIN FUNCTIONS NECESSARY FOR AUTOSUGGEST ******************************

	// Teach Autosuggest how to calculate suggestions for any given input value.
	getSuggestions(value) {

	  const escapedValue = this.escapeRegexCharacters(value.trim());
	  
	  if (escapedValue === '') {
	    return [];
	  }

	  const regex = new RegExp('^' + escapedValue, 'i');

	  return this.state.contactsAndGroups
	    .map(type => {

	      return {
	        type: type.type,
	        names: type.names[0].filter(name => regex.test(name.first_name || name.nickname))
	      };
	    })
	    .filter(type => type.names.length > 0);
	}



	// When suggestion is clicked, Autosuggest needs to populate the input
	// based on the clicked suggestion. Teach Autosuggest how to calculate the
	// input value for every given suggestion.
	getSuggestionValue(suggestion) {

		if (suggestion.nickname) {
			// if the suggestion is a group
			this.addGroup(suggestion)
		
		} else {
			// if the suggestion is a contact
			this.addRecipient(suggestion)
		
		}

		/* 

		This function needs to return something for the react-autosuggest component.
		the returned value is what replaces the input in the auto-suggest. we are clearing it

		*/
		return ""
	}

	// Use your imagination to render suggestions.
	renderSuggestion(suggestion) {

		return (
			<div>
				{suggestion.nickname}
		    {suggestion.first_name} {suggestion.last_name}
		  </div>
		)
	}

	renderSectionTitle(type) {

		return (
			<strong>{type.type}</strong>
		)
	}

	getSectionSuggestions(type) {

		return type.names
	}

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested(value) {

	  this.setState({
	    suggestions: this.getSuggestions(value.value)
	  });
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested() {
	  this.setState({
	    suggestions: []
	  });
	};


	onChange(event, { newValue, method}) {
		this.setState({
			value: newValue
		});
	}

	

	// END FUNCTIONS NECESSARY FOR AUTOSUGGEST ********************************

	


	render() {

		let createButton


		if (this.state.page == "contacts" && this.state.tab == "nav-contacts-tab") {
			createButton =
			<button onClick={this.setFormSelection} id="contact" className="btn btn-primary btn-lg">
				<FontAwesomeIcon icon="plus" />&nbsp;&nbsp;Create contact
			</button>

		} else if (this.state.page == "contacts" && this.state.tab == "nav-groups-tab") {
			createButton =
			<button onClick={this.setFormSelection} id="group" className="btn btn-primary btn-lg">
				<FontAwesomeIcon icon="plus" />&nbsp;&nbsp;Create group
			</button>
		} else {
			createButton = 
			<button onClick={this.setFormSelection} id="message" className="btn btn-primary btn-lg">
				<FontAwesomeIcon icon="plus" />&nbsp;&nbsp;Send message
			</button>
		}






		
		return (
			<div className="container-fluid">
				<div className="row dashboard">
					<div className="col-md-3 col-sm-3 pt-4 bg-light">
					
						<ul className="nav flex-column sidebar-buttons">
							<li className="nav-item">
								{createButton}
							</li>
							<li className="nav-item pt-3">
								<a onClick={this.setPage} id="contacts" className="nav-link">
									<FontAwesomeIcon icon="user-alt" />&nbsp; Contacts ({this.state.userContacts.length})
								</a>
							</li>
							<li className="nav-item">
								<a onClick={this.setPage} id="messages" className="nav-link">
									<FontAwesomeIcon icon="inbox" />&nbsp; Messages
								</a>
							</li>
							
						</ul>
					</div>
					<div className="col-md-9 col-sm-9 ml-auto pt-4 pr-2 mh-100">
						<GroupModal 
							{...this.state}
							clearSelectedGroup={this.clearSelectedGroup}
							addGroupMembers={this.addGroupMembers}
							removeGroupMembers={this.removeGroupMembers}/>
						<FormModal 
							{...this.state}
							{...this.props}
							handleInputChange={this.handleInputChange} 
							newContact={this.newContact}
							deleteContact={this.deleteContact}
							addRecipient={this.addRecipient}
							addRecipientFromContactsPage={this.addRecipientFromContactsPage}
							deleteRecipient={this.deleteRecipient}
							addGroup={this.addGroup}
							newGroup={this.newGroup}
							deleteGroup={this.deleteGroup}
							setSelectedGroup={this.setSelectedGroup}
							sendMessage={this.sendMessage}
							formSelection={this.state.formSelection}
							errorMessage={this.state.errorMessage}
							onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
							onSuggestionsClearRequested={this.onSuggestionsClearRequested}
							getSuggestionValue={this.getSuggestionValue}
							renderSuggestion={this.renderSuggestion}
							renderSectionTitle={this.renderSectionTitle}
							getSectionSuggestions={this.getSectionSuggestions}
							onChange={this.onChange}/>
						
						{this.renderView()}
						
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard