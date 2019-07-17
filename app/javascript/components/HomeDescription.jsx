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
					<div className="row divider"/>
					<div className="row">
						<div className="col-md-4 col-sm-4 bg-light">
							<div className="row">
								<div className="col-md-12 col-sm-12 image">
									<FontAwesomeIcon icon="sms" size="5x" />
								</div>
								<div className="col-md-8 offset-md-2 col-sm-8 offset-sm-8 text">
									<h2>SMS is a powerful tool for reaching clients</h2>
									<p>It can be overwhelming to manage on your small cell phone screen when you've got a lot of them.</p>
									
								</div>
								
							</div>
						</div>
						<div className="col-md-4 col-sm-4 bg-light">
							<div className="row ">
								<div className="col-md-12 col-sm-12 image">
									<FontAwesomeIcon icon="users" size="5x" />
								</div>
								<div className="col-md-8 offset-md-2 col-sm-8 offset-sm-8 text">
									<h2>Ping simplifies messaging</h2>
									<p>Easily send annoucements, notifications, etc to individual contacts or large groups.</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 col-sm-4 bg-light">
							<div className="row">
								<div className="col-md-12 col-sm-12 image">
									<FontAwesomeIcon icon="satellite-dish" size="5x" />
								</div>
								<div className="col-md-8 offset-md-2 col-sm-8 offset-sm-8 text">
									<h2>Reach more people with less effort</h2>
									<p>Group contacts together and send them all the same message at once!</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
			
		)
	}
}

export default HomeDescription