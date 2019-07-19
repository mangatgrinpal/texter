import React from "react"
import Autosuggest from "react-autosuggest"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class FormModal extends React.Component {
	constructor(props){
		super(props)
	}

	messageRecipients() {
		let recipients = this.props.recipients
		if (recipients.length == 0) {
			return (
				<div className="col-12 message-recipients pt-2">
					Add contacts above
				</div>
			)
		} else {

			let messageRecipients = this.props.recipients.map((recipient)=> {
				//using recipient.id in name attribute is bad. pls fix later	
				return (

					<div key={recipient.id} className="badge badge-primary mr-2 mt-2">
						{recipient.first_name} {recipient.last_name} &nbsp;
						<FontAwesomeIcon className="font-awesome-icon" data-id={recipient.id} onClick={this.props.deleteRecipient} icon="times" size="1x" />
					</div>

				)
			})

			return (
				<React.Fragment>

					<div className="col-md-12 col-sm-12 message-recipients">
						{messageRecipients}
					</div>

				</React.Fragment>
			)
		}
	}

	render() {

		let form, title, textPreview, button, modalTitle
		if (this.props.message.trim()) {
			textPreview =
				<div className="col-md-8 col-sm-8 offset-md-2 offset-sm-2 speech-bubble p-2">
					<div className="speech-bubble-text">
						<strong>@{this.props.currentUser.first_name}:</strong> {this.props.message}
					</div>
				</div>
			title = 
			<div className="col-md-8 col-sm-8 offset-md-2 offset-sm-2">
				<strong>Preview your text below before you send it.</strong>
			</div>
			

		} else {
			textPreview = <div className="col-md-12 col-sm-12" />
			title = <div className="col-md-12 col-sm-12" />
		}

		const { value, suggestions } = this.props;

		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			placeholder: 'Enter contacts or groups here',
			value,
			onChange: this.props.onChange
		}

		if (this.props.formSelection == "message") {
			modalTitle =
			"Send a Message"
			button =
			<button onClick={this.props.sendMessage} className="btn btn-primary">Send Message</button>
			form = 
			<React.Fragment>
				<div className="row">
					<div className="col-6">
						<div className="row">
							{title}

						</div>
						<div className="row pt-3">
							{textPreview}
						</div>				
					
					</div>

					
					<div className="col-6">
					<form autoComplete="off">
						<div className="row">
							<div className="col-12">
								<Autosuggest
									multiSection={true}
									suggestions={suggestions}
									renderInputComponent={this.props.renderInputComponent}
									onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
									onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
									getSuggestionValue={this.props.getSuggestionValue}
									renderSuggestion={this.props.renderSuggestion}
									renderSectionTitle={this.props.renderSectionTitle}
									getSectionSuggestions={this.props.getSectionSuggestions}
									inputProps={inputProps}
								/>
								
							</div>
							
						</div>
						
						<div className="row">
						<div className="col-12"/>




							{this.messageRecipients()}
							
							
						</div>
						<br/>
						<div className="row">


							<div className="col-md-12 col-sm-12">
								<small>Your name will be prefixed onto your message so your recipients will know who it is.</small>
								
								<textarea type="text" onChange={this.props.handleInputChange} value={this.props.message} className="form-control" name="message" placeholder="Your message here" />
								<span className="d-flex justify-content-end">{this.props.message.trim().length + this.props.currentUser.first_name.length + 3}/160</span><br/>
								<small>The character limit above is the max length for a single text message and factors in your prefixed name. Anything over this limit will still be sent, but in multiple SMS messages.</small>
							</div>
							
						</div>
						<br/>
					</form>

					</div>
				</div>

			</React.Fragment>

		} 
		// we'll implement this later
		if (this.props.formSelection == "group") {
			form =
			<React.Fragment>
				<div className="row">
					<div className="col pt-3">
						<h3>Create a New Group</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-md-3 col-sm-3">
						Nickname
					</div>
				</div>
				<form autoComplete="off">
					<div className="form-row">
						<div className="col">
							<input type="text" value={this.props.nickname} onChange={this.props.handleInputChange} className="form-control" name="nickname" placeholder="Group Name"/>
						</div>
						
						<div className="col">
							<button onClick={this.props.newGroup} className="btn btn-primary">Create Group</button>
						</div>
					</div>
				</form>
			</React.Fragment>

		}

		if (this.props.formSelection == "contact") {
			modalTitle =
			"Create New Contact"
			button =
			<button onClick={this.props.newContact} className="btn btn-primary">Create contact</button>
			form =
			<React.Fragment>
				<div className="col-md-8 col-sm-8 offset-sm-2 offset-md-2 p-3">
					<form autoComplete="off">
						<div className="form-group row">
							<label className="col-sm-4 col-form-label">First name</label>
							<div className="col-sm-8">
								<input type="text" value={this.props.first_name} onChange={this.props.handleInputChange} className="form-control" name="first_name" placeholder="First Name"/>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-sm-4 col-form-label">Last name</label>
							<div className="col-sm-8">
								<input type="text" value={this.props.last_name} onChange={this.props.handleInputChange} className="form-control" name="last_name" placeholder="Last Name"/>
							</div>
						</div>
						<div className="form-group row">
							<label className="col-sm-4 col-form-label">Phone number</label>
							<div className="col-sm-8">
								<input type="tel" value={this.props.phone_number} onChange={this.props.handleInputChange} className="form-control"	name="phone_number" placeholder="(xxx)xxx-xxxx"/>
							</div>
						</div>
					</form>
					<div className="row">
						<div className="col-md-6 offset-md-3 col-sm-6 offset-md-3 pt-5">
							<p className="text-center">
								<small>
									Please make sure you have consent from your contacts before you send them messages using PING.
								</small>
							</p>
						</div>
					</div>
				</div>
			</React.Fragment>
		}

		
		return (
			<div className="modal" id="formModalCenter" tabIndex="-1" role="dialog" aria-labelledby="formModalCenterTitle" aria-hidden="true">
			  <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
			    <div className="modal-content">
			      <div className="modal-header justify-content-center">
			        <h5 className="modal-title" id="formModalCenterTitle">{modalTitle}</h5>
			      </div>
			      <div id="formModalBody" className="modal-body">
			        {form}
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			        {button}
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}

export default FormModal