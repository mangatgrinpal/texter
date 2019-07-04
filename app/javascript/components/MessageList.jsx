import React from "react"


class MessageList extends React.Component {
	constructor(props) {
		super(props)
		this.getMessageRecipients = this.getMessageRecipients.bind(this)
		this.clearMessageRecipients = this.clearMessageRecipients.bind(this)
		this.state = {
			messageRecipients: [],
			loading: false
		}
	}

	componentDidMount() {

		
	}


	getMessageRecipients(e) {
		this.setState({loading: true})
		let message = e.currentTarget.dataset.id

		fetch("/messages/" + message, {
			method: "GET",
			headers: {
				"X-CSRF-Token": this.props.csrfToken,
				"Content-Type": "application/json"

			}
		})
		.then ( res => res.json() )
		.then ( data => {

			this.setState({messageRecipients: data.recipients},()=> {
				this.setState({loading: false})
			}) 
		})
	}

	clearMessageRecipients(e) {
		this.setState({messageRecipients: []})
	}


	renderRecentMessages() {

		// FIX YOUR CODE IN HERE LATER. THIS SHIT IS WET AF.. NOT DRY AT ALL!!
		let recentMessages = this.props.recentMessages

		if (recentMessages.length == 0) {
			return (
				<div className="pt-3">
					You haven't sent any messages recently.
				</div>
			)
		} else {
			let recipients;
			let messages = recentMessages.map((message)=> {



				// if the message only has one recipient, just return that one's name
				if (message.recipients.length == 1) {
					recipients = 
						
							message.recipients[0]

				// if there is just 1 more, this is the conditional
				} else if (message.recipients.length == 2) {
						
						recipients =

							message.recipients[0] + " & " + message.recipients[1]
							 


					// else return the first one's name + the count of others
				} else {

					let remainingRecipients = message.recipients.slice(1)


					recipients =
						
							<React.Fragment>

							{message.recipients[0]} & &nbsp;
							
								<a href="javascript:void(0)"
										data-id={message.id}
										data-toggle="popover"
										data-trigger="hover"
										data-placement="left"
										data-animation={true}>

									{message.recipients.length-1} others
							  
								</a>
							</React.Fragment>
				}


				// here is the message list that will be seen
				return (
					
						<li key={message.id} className="list-group-item d-flex justify-contents-between align-items-center my-1">
	
								<div className="col-md-9 col-sm-9 message-body">
									{message.body}
								</div>
								<div onMouseEnter={this.getMessageRecipients} data-id={message.id} className="col-md-3 col-sm-3 message-recipients">
									{recipients}
									
								</div>
									
							
						</li>
								
					
				)
			})

			return (
				<div id="message-list">
					<ul className="list-group">
						{messages}
					</ul>
				</div>
			)
		}
	}

	popoverContentGenerator() {
		
	}

	render() {
		$(()=> {
		  $('[data-toggle="popover"]').popover({
		  	html: true,
		  	container: 'body',
		  	content: function () {
		  		return $('.popover-content').html();
		  	}
		  })
		})

		let popoverContent
		let messageRecipients = this.state.messageRecipients

		// if (this.state.loading) {
		// 		popoverContent = 
		// 		<div className="popover-content">
		// 			Loading...
		// 		</div>
			
		// } else {

			let remainingRecipientsList = messageRecipients.slice(1).map((recipient)=> {
				return (
					<li key={recipient.id} className="list-group-item">
	 					{recipient}
	 				</li>
				)
			})

			popoverContent =
				<ul className="popover-content list-group list-group-flush">
					{remainingRecipientsList}
				</ul>
			
		// }


		return (
			<React.Fragment>
				{popoverContent}
				<div className="row pt-5">
					<div className="col-12">
						<h3>Recent Messages</h3>
						{this.renderRecentMessages()}

					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default MessageList