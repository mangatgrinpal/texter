import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class HomeDescription extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<React.Fragment>
				<div className="description">
					<div className="row">
						<div className="col-md-4 offset-md-1 text">
							<h2>SMS is a powerful tool for reaching clients</h2>
							<p>It can be overwhelming to manage on your small cell phone screen when you've got a lot of them.</p>
							
						</div>
						<div className="col-md-6 image">
							<FontAwesomeIcon icon="sms" size="10x" />
						</div>
					</div>
					<div className="row simplifies">
						<div className="col-md-3 image">
							<FontAwesomeIcon icon="user" size="10x" />
						</div>
						<div className="col-md-4 offset-md-1 text">
							<h2>Ping simplifies messaging</h2>
							<p>Easily send annoucements, notifications, etc to individual contacts or large groups.</p>
						</div>
						<div className="col-md-3 image">
							<FontAwesomeIcon icon="users" size="10x" />
						</div>
					</div>
					<div className="row">
						<div className="col-md-6 image">
							<FontAwesomeIcon icon="satellite-dish" size="10x" />
						</div>
						<div className="col-md-4 offset-md-1 text">
							<h2>Reach more people with less effort.</h2>
						</div>
					</div>

				</div>
				
			</React.Fragment>
			
		)
	}
}

export default HomeDescription