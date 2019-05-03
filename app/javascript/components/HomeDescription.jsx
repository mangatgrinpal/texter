import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class HomeDescription extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<React.Fragment>
				<div className="row hero-break"/>
				<div className="row">
					<div className="col">
						<h2>Using a cell phone to text many people for marketing, emergencies, product updates, etc. can be difficult when you've got a lot of people to message.</h2>
						
					</div>
					<div className="col">
						<FontAwesomeIcon icon="sms" size="5x" />
					</div>
				</div>
				<div className="row">
					<div className="col">
						<FontAwesomeIcon icon="user" size="5x" />
					</div>
					<div className="col">
						<h2>Ping allows you to simply message contacts individually or groups of contacts simultaneously, making the messaging process extremely easy.</h2>
					</div>
					<div className="col">
						<FontAwesomeIcon icon="users" size="5x" />
					</div>
				</div>
				<div className="row">
					<div className="col">
						<FontAwesomeIcon icon="satellite-dish" size="5x" />
					</div>
					<div className="col">
						<h2>Reach more people with less effort.</h2>
					</div>
				</div>

			</React.Fragment>
			
		)
	}
}

export default HomeDescription