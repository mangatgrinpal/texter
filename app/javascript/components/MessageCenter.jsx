import React from "react"
import MessageList from "./MessageList"
import Autosuggest from "react-autosuggest"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


class MessageCenter extends React.Component {
	constructor(props) {
		super(props);
		this.messageRecipients = this.messageRecipients.bind(this)

		
	}


	messageRecipients() {
		let recipients = this.props.recipients
		if (recipients.length == 0) {
			return (
				<div className="col-6">
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

					<div className="col-6">
						{messageRecipients}
					</div>

				</React.Fragment>
			)
		}
	}





	render() {

		let textPreview, title
		if (this.props.message) {
			textPreview =
				<div className="col-md-4 col-sm-4 offset-md-1 offset-sm-1 speech-bubble p-2">
					@{this.props.currentUser.first_name}: {this.props.message}
				</div>
			title = <h5>Preview your text below before you send it.</h5>

		} else {
			textPreview = <div />
			title = <div/>
		}

		const { value, suggestions } = this.props;

		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			placeholder: 'Add contacts or groups here',
			value,
			onChange: this.props.onChange
		}

		
		return (
			<div className="col-12">
				<div className="row">
					<div className="col">
						<h3>Send a message</h3>
					</div>
				</div>
				<form autoComplete="off">
					<div className="row">
						<div className="col-6">
							<Autosuggest
								multiSection={true}
								suggestions={suggestions}
								onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
								onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
								getSuggestionValue={this.props.getSuggestionValue}
								renderSuggestion={this.props.renderSuggestion}
								renderSectionTitle={this.props.renderSectionTitle}
								getSectionSuggestions={this.props.getSectionSuggestions}
								inputProps={inputProps}
							/>
							
						</div>
						<button onClick={this.props.addRecipient} className="btn btn-primary">
							Add
						</button>
						
					</div>
					
					<div className="row">
					
						{this.messageRecipients()}
						<div className="col-6">
							{title}
						</div>
						
					</div>
					<br/>
					<div className="row">
						<div className="col-6">
							<small>Your name will be prefixed onto your message so your recipients will know who it is.</small>
							
							<textarea type="text" onChange={this.props.handleInputChange} value={this.props.message} className="form-control" name="message" placeholder="Your message here" />
							<span className="d-flex justify-content-end">{this.props.message.length + this.props.currentUser.first_name.length + 3}/160</span><br/>
							<small>The character limit above is the max length for a single text message and factors in your prefixed name. Anything over this limit will still be sent, but in multiple SMS messages.</small>
						</div>
						{textPreview}
					</div>
					<br/>
					<button onClick={this.props.sendMessage} className="btn btn-primary">Send Message</button>
				</form>
				<MessageList {...this.props}/>
				

			</div>
		)



	}
}

export default MessageCenter