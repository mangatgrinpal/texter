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
		this.addGroup = this.addGroup.bind(this)
		this.newGroup = this.newGroup.bind(this)
		this.deleteGroup = this.deleteGroup.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.addRecipient = this.addRecipient.bind(this)
		// the add recipient function below is only used on contact list page
		this.addRecipientFromContactsPage = this.addRecipientFromContactsPage.bind(this)
		this.deleteRecipient = this.deleteRecipient.bind(this)
		this.setPage = this.setPage.bind(this)
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

	renderSidebar() {
		
			return (
				<div className="col-md-3 col-sm-3 pt-4 bg-light">
					
					<ul className="nav flex-column">
						<li className="nav-item">
							<a onClick={this.setPage} id="home" className="nav-link">
								Hello, {this.props.currentUser.first_name}
							</a>
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
				addRecipientFromContactsPage={this.addRecipientFromContactsPage}
				deleteRecipient={this.deleteRecipient}
				addGroup={this.addGroup}
				newGroup={this.newGroup}
				deleteGroup={this.deleteGroup}
				setSelectedGroup={this.setSelectedGroup}
				sendMessage={this.sendMessage}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={this.getSuggestionValue}
				renderSuggestion={this.renderSuggestion}
				renderSectionTitle={this.renderSectionTitle}
				getSectionSuggestions={this.getSectionSuggestions}
				onChange={this.onChange}/>
		
		)
	}

	sendMessage(e) {
		e.preventDefault()
		let messageWithSenderName = "@" + this.props.currentUser.first_name + ": " + this.state.message.trim()

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
					recentMessages: data,
					message: "",
					recipients: []
				})
			})
		} else {
			alert('Whoops, you\'re missing something!')
		}
	}

	

	//this function adds recipients to the recipient array in state, to whom the message will be sent
	//this function will be used only with auto-suggest
	addRecipient(recipient) {

		





		let recipients = Object.assign([], this.state.recipients);

		let duplicateChecker = recipients.some(person=> {
		    return person.id == recipient.id
		})

		if (duplicateChecker) {

			alert('Already added foo!!')
		
		} else {
			
			recipients.push(recipient)

			this.setState({ recipients: recipients })

		}		

	}


	// this function will only be used to add contacts from the contact list.. for now
	addRecipientFromContactsPage(e) {

		e.preventDefault()


		let target = e.target.dataset.id

		let recipients = Object.assign([], this.state.recipients)

		let contact = this.state.userContacts.filter((contact)=> {
			if (contact.id == target) {

				return contact
			}
		})



		if (recipients.includes(contact[0])) {

			alert('Already added foo!')

		} else {
			
			let newRecipients = recipients.concat(contact)

			this.setState({ page: 'messages', recipients: newRecipients })

		}

	}

	// this function will add entire groups to the message recipient list
	addGroup(group) {

		if (group.contacts.length === 0) {

			alert('theres no one in this group!')

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
					alert('Duplicate contacts have been omitted.')
				}

				this.setState({ recipients: result})

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
				let contactsAndGroups = Object.assign([], this.state.contactsAndGroups)
				contactsAndGroups[0].names[0] = data


				this.setState({userGroups: data, nickname: "", contactsAndGroups: contactsAndGroups}) 
			})
		}
		
	}
	// this function deletes groups
	deleteGroup(e) {
		let group = e.currentTarget.value
		
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
		let group = e.currentTarget.value
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
		
		return (
			<div className="container-fluid">
				<div className="row dashboard">
					{this.renderSidebar()}
					<div className="col-md-9 col-sm-9 ml-auto pt-4 pr-2 mh-100">
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