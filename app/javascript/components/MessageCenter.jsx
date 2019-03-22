import React from "react"

class MessageCenter extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.state = {
			contact: "",
			message: ""
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

	render() {
		return (
			<div className="col-12">
				<div className="row">
					<div className="col">
						<h3>Send a message</h3>
					</div>
				</div>
				<form>
					<div className="row">
						<div className="col">
							<input type="text" onChange={this.handleInputChange} className="form-control" name="contact" placeholder="Contacts go here" />
						</div>
					</div>
					<div className="row">
						<div className="col">
							<input type="text" onChange={this.handleInputChange} className="form-control" name="message" placeholder="Message goes here" />
						</div>
					</div>
					<button onClick={this.sendMessage} className="btn btn-primary">Send Message</button>
				</form>
				
			</div>
		)
	}
}

export default MessageCenter