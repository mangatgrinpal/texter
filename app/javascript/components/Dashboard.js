import React from "react"

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-3">
						<h1>User Information</h1>
					</div>
					<div className="col-9">
						<h1>User Contacts</h1>
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard