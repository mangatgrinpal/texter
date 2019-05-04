import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class HomeDescription extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<React.Fragment>
				<div className="row">
					<div className="col">
						<h2>SMS is a powerful tool for reaching clients</h2>
						<p>It can be overwhelming to manage on your small cell phone screen when you've got a lot of them.</p>
						
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
						<h2>Ping simplifies messaging</h2>
						<p>Easily send annoucements, notifications, etc to individual contacts or large groups.</p>
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