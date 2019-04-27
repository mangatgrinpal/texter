import React from "react"

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
						<h2>Describe the problem</h2>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h2>describe how this solves the problem</h2>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h2>show examples, and re-assert they sign up</h2>
					</div>
				</div>

			</React.Fragment>
			
		)
	}
}

export default HomeDescription