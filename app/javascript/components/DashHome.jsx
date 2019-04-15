import React from "react"

class DashHome extends React.Component {
	constructor(props) {
		super(props);
	}

	

	render() {
		
		return (
			<div>
				<h3>Welcome {this.props.currentUser.email}</h3>
				<p>What would you like to do today?</p>
				<p>You have sent {this.props.recentMessages.length} messages in the last week.</p>
				
				<button className="btn btn-primary">View Options</button>
			</div>
		)
	}
}

export default DashHome